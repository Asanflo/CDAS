from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import Utilisateur, Role, Permission
from .services import UtilisateurService

class UtilisateurTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        # Création du rôle par défaut (Default) sans forcer l'id
        cls.default_role, _ = Role.objects.get_or_create(
            libelle="Default",
            defaults={"description": "Rôle par défaut"}
        )

        # Création d'un rôle de test supplémentaire
        cls.role, _ = Role.objects.get_or_create(
            libelle="TestRole",
            defaults={"description": "Role test"}
        )

        # Création d'un superuser pour authentification
        cls.admin = Utilisateur.objects.create_superuser(
            email="admin@test.com",
            password="AdminPass123!",
            role=cls.role,
            nom="Admin"
        )

    def setUp(self):
        self.client = APIClient()
        # Obtention du token JWT pour l'admin
        response = self.client.post(reverse("token_obtain_pair"), {
            "email": "admin@test.com",
            "password": "AdminPass123!"
        }, format='json')
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    # -----------------------------
    # Tests du manager personnalisé
    # -----------------------------
    def test_create_superuser_default_role(self):
        superuser = Utilisateur.objects.create_superuser(
            email="super@test.com",
            password="SuperPass123!",
            nom="SuperUser"
        )
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        # Vérification du rôle par libelle "Admin"
        self.assertEqual(superuser.role.libelle, "Admin")

    # -----------------------------
    # Tests du service UtilisateurService
    # -----------------------------
    def test_create_user_via_service(self):
        data = {
            "nom": "John Doe",
            "email": "john@test.com",
            "telephone": "123456789",
            "password": "TestPass123",
            "role_id": self.role.id
        }
        user = UtilisateurService.create_user_with_default_role(data)
        self.assertEqual(user.email, "john@test.com")
        self.assertTrue(user.check_password("TestPass123"))

    def test_create_user_without_role_id(self):
        data = {
            "nom": "Bob",
            "email": "bob@test.com",
            "telephone": "111222333",
            "password": "BobPass123"
        }
        user = UtilisateurService.create_user_with_default_role(data)
        self.assertEqual(user.role.libelle, "Default")
        self.assertEqual(user.email, "bob@test.com")

    def test_create_user_invalid_role(self):
        data = {
            "nom": "Invalid",
            "email": "invalid@test.com",
            "telephone": "000111222",
            "password": "Invalid123",
            "role_id": 999  # rôle inexistant
        }
        with self.assertRaises(ValueError):
            UtilisateurService.create_user_with_default_role(data)

    # -----------------------------
    # Tests des endpoints
    # -----------------------------
    def test_inscription_endpoint(self):
        url = reverse("inscription")
        data = {
            "nom": "Alice",
            "email": "alice@test.com",
            "telephone": "987654321",
            "password": "AlicePass123",
            "role_id": self.role.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["email"], "alice@test.com")

    def test_inscription_endpoint_invalid_role(self):
        url = reverse("inscription")
        data = {
            "nom": "InvalidRole",
            "email": "invalidrole@test.com",
            "telephone": "123123123",
            "password": "Pass123",
            "role_id": 999
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_users_list_authenticated(self):
        url = reverse("utilisateurs-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(response.data, list))

    def test_get_me_endpoint(self):
        url = reverse("utilisateurs-me")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.admin.email)

    def test_retrieve_user(self):
        url = reverse("utilisateurs-detail", args=[self.admin.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.admin.email)

    def test_update_user(self):
        url = reverse("utilisateurs-detail", args=[self.admin.id])
        data = {"nom": "AdminUpdated"}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.admin.refresh_from_db()
        self.assertEqual(self.admin.nom, "AdminUpdated")

    def test_delete_user(self):
        url = reverse("utilisateurs-detail", args=[self.admin.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Utilisateur.objects.filter(id=self.admin.id).exists())

    # -----------------------------
    # Tests permissions et rôles
    # -----------------------------
    def test_role_permission_check(self):
        perm = Permission.objects.create(codename="can_test", description="Test permission")
        self.role.permissions.add(perm)
        self.assertTrue(self.admin.has_permission("can_test"))
        self.assertFalse(self.admin.has_permission("nonexistent_perm"))
