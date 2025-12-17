from django.test import TestCase
from django.contrib.auth import get_user_model

from accounts.models import Role, Utilisateur
from procedures.models import Procedure, Etudiant, Document, Paiement

User = get_user_model()


class ProcedureTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # 🔹 Supprimer le rôle "TestRole" si il existe déjà
        Role.objects.filter(libelle="TestRole").delete()

        # 🔹 Création d'un rôle pour les tests
        cls.role = Role.objects.create(
            libelle="TestRole",
            description="Rôle test"
        )

        # 🔹 Supprimer l'utilisateur test si il existe
        Utilisateur.objects.filter(email="testuser@example.com").delete()

        # 🔹 Création d'un utilisateur test
        cls.utilisateur = Utilisateur.objects.create_user(
            nom="Test",
            email="testuser@example.com",
            telephone="699123456",
            password="password123",
            role=cls.role
        )

        # 🔹 Création d'une procédure test
        cls.procedure = Procedure.objects.create(
            initiateur=cls.utilisateur,
            type="Demande test",
            motif_procedure="Motif test"
        )

        # 🔹 Création d'un étudiant lié à la procédure
        cls.etudiant = Etudiant.objects.create(
            procedure=cls.procedure,
            matricule="MAT123",
            nom="Etudiant",
            prenom="Test",
            filiere="Informatique",
            ecole="ENSPD",
            moyenne_generale=14.5
        )

        # 🔹 Création d'un document pour la procédure
        cls.document = Document.objects.create(
            procedure=cls.procedure,
            valeur=None,
            conformite=True,
            certification=True,
            signature_directeur=True,
            approbation_rectorat=True
        )

        # 🔹 Création d'un paiement pour la procédure
        cls.paiement = Paiement.objects.create(
            procedure=cls.procedure,
            telephone_paiement="699123456",
            montant=1000,
            statut="EN_ATTENTE",
            motif=cls.procedure.motif_procedure
        )

    def test_procedure_creation(self):
        """Vérifie que la procédure est correctement créée"""
        self.assertEqual(self.procedure.type, "Demande test")
        self.assertEqual(self.procedure.initiateur, self.utilisateur)
        self.assertEqual(self.procedure.statut, "EN_ATTENTE_VALIDATION")

    def test_etudiant_linked_to_procedure(self):
        """Vérifie que l'étudiant est bien lié à la procédure"""
        self.assertEqual(self.etudiant.procedure, self.procedure)
        self.assertEqual(self.etudiant.nom, "Etudiant")

    def test_document_linked_to_procedure(self):
        """Vérifie que le document est lié à la procédure"""
        self.assertEqual(self.document.procedure, self.procedure)
        self.assertTrue(self.document.conformite)

    def test_paiement_linked_to_procedure(self):
        """Vérifie que le paiement est lié à la procédure"""
        self.assertEqual(self.paiement.procedure, self.procedure)
        self.assertEqual(self.paiement.statut, "EN_ATTENTE")
        self.assertFalse(self.paiement.is_paiement_valide)

    def test_paiement_validation(self):
        """Simule un paiement réussi et vérifie les statuts"""
        self.paiement.statut = "REUSSI"
        self.paiement.procedure.statut = "VALIDEE"
        self.paiement.save()
        self.paiement.procedure.save()

        self.assertTrue(self.paiement.is_paiement_valide)
        self.assertEqual(self.paiement.procedure.statut, "VALIDEE")
