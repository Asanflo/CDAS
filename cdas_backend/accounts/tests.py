from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import Utilisateur, Role, Permission
from .services import UtilisateurService


class UtilisateurTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        # 🔹 Rôle par défaut conforme à la règle métier
        cls.default_role = Role.objects.create(
            libelle="user",
            description="Rôle utilisateur par défaut"
        )

        # 🔹 Rôle de test
        cls.role = Role.objects.create(
            libelle="TestRole",
            description="Role test"
        )

        # 🔹 Super utilisateur
        cls.admin = Utilisateur.objects.create_superuser(
            email="admin@test.com",
            password="AdminPass123!",
            role=cls.role,
            nom="Admin"
        )

    def setUp(self):
        self.client = APIClient()
        response = self.client.post(
            reverse("token_obtain_pair"),
            {"email": "admin@test.com", "password": "AdminPass123!"},
            format="json"
        )
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    # =============================
    # Tests du service
    # =============================

    def test_create_user_with_role_id(self):
        data = {
            "nom": "John",
            "email": "john@test.com",
            "telephone": "123456",
            "password": "Pass123",
            "role_id": self.role.id
        }
        user = UtilisateurService.create_user_with_default_role(data)
        self.assertEqual(user.role, self.role)

    def test_create_user_without_role_id_assigns_default_role(self):
        data = {
            "nom": "Bob",
            "email": "bob@test.com",
            "telephone": "987654",
            "password": "BobPass123"
        }
        user = UtilisateurService.create_user_with_default_role(data)
        self.assertEqual(user.role, self.default_role)

    def test_create_user_password_is_hashed(self):
        data = {
            "nom": "Hash",
            "email": "hash@test.com",
            "telephone": "000111",
            "password": "Secret123"
        }
        user = UtilisateurService.create_user_with_default_role(data)
        self.assertTrue(user.check_password("Secret123"))

    def test_create_user_invalid_role_id(self):
        data = {
            "nom": "Invalid",
            "email": "invalid@test.com",
            "telephone": "000111",
            "password": "Invalid123",
            "role_id": 999
        }
        with self.assertRaises(ValueError):
            UtilisateurService.create_user_with_default_role(data)

    # =============================
    # Tests endpoints inscription
    # =============================

    def test_inscription_endpoint_success(self):
        response = self.client.post(
            reverse("inscription"),
            {
                "nom": "Alice",
                "email": "alice@test.com",
                "telephone": "999888",
                "password": "AlicePass123",
                "role_id": self.role.id
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_inscription_endpoint_invalid_role(self):
        response = self.client.post(
            reverse("inscription"),
            {
                "nom": "Bad",
                "email": "bad@test.com",
                "telephone": "000999",
                "password": "Bad123",
                "role_id": 999
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # =============================
    # Tests endpoints utilisateurs
    # =============================

    def test_get_users_list_authenticated(self):
        response = self.client.get(reverse("utilisateurs-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_get_me_endpoint(self):
        response = self.client.get(reverse("utilisateurs-me"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.admin.email)

    def test_retrieve_user(self):
        response = self.client.get(
            reverse("utilisateurs-detail", args=[self.admin.id])
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        response = self.client.patch(
            reverse("utilisateurs-detail", args=[self.admin.id]),
            {"nom": "AdminUpdated"},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.admin.refresh_from_db()
        self.assertEqual(self.admin.nom, "AdminUpdated")

    def test_delete_user(self):
        response = self.client.delete(
            reverse("utilisateurs-detail", args=[self.admin.id])
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Utilisateur.objects.filter(id=self.admin.id).exists())

    # =============================
    # Tests permissions
    # =============================

    def test_role_permission_check(self):
        perm = Permission.objects.create(
            codename="can_test",
            description="Test permission"
        )
        self.role.permissions.add(perm)
        self.assertTrue(self.admin.has_permission("can_test"))
        self.assertFalse(self.admin.has_permission("unknown_perm"))
