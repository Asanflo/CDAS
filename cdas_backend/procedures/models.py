from django.db import models
from accounts.models import Utilisateur
# Create your models here.
class Procedure(models.Model):
    STATUTP_CHOICES = [
        ("EN_ATTENTE_VALIDATION", "En attente de validation"),
        ("VALIDEE", "Validée"),
        ("REJETEE", "Rejetée"),
    ]
    class Meta:
        verbose_name = 'Procedure'
        verbose_name_plural = 'Procedures'
    id = models.AutoField(primary_key=True)
    initiateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    motif_procedure = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=100, choices=STATUTP_CHOICES, default="EN_ATTENTE_VALIDATION")
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Procedure {self.id},{self.type} de {self.initiateur}"

class Document(models.Model):
    class Meta:
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'

    id = models.AutoField(primary_key=True)
    procedure = models.ForeignKey(Procedure, on_delete=models.CASCADE)
    valeur = models.FileField(upload_to='documents/', blank=True, null=True)
    conformite = models.BooleanField(default=False)
    certification = models.BooleanField(default=False)
    signature_directeur = models.BooleanField(default=False)
    approbation_rectorat = models.BooleanField(default=False)
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Document {self.id},{self.valeur}"

class Etudiant(models.Model):
    class Meta:
        verbose_name = 'Etudiant'
        verbose_name_plural = 'Etudiants'

    id = models.AutoField(primary_key=True)
    procedure = models.OneToOneField( Procedure, on_delete=models.CASCADE, related_name="etudiant" )
    matricule = models.CharField(max_length=100)
    nom = models.CharField(max_length=100, blank=True, null=True)
    prenom = models.CharField(max_length=100, blank=True, null=True)
    filiere = models.CharField(max_length=100, blank=True, null=True)
    ecole = models.CharField(max_length=100, blank=True, null=True)
    moyenne_generale = models.DecimalField( max_digits=4, decimal_places=2, blank=True, null=True )

class ReponseProcedure(models.Model):
    class Meta:
        verbose_name = 'Response Procedure'
        verbose_name_plural = 'Response Procedures'

    id = models.AutoField(primary_key=True)
    titre = models.CharField(max_length=100)
    contenu = models.TextField(blank=True, null=True)
    procedure_liee = models.ForeignKey(Procedure, on_delete=models.CASCADE)
    genere_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Response Procedure {self.id},{self.titre}"

class Paiement(models.Model):
    STATUT_CHOICES = [
        ("EN_ATTENTE", "En attente"),
        ("REUSSI", "Réussi"),
        ("ECHOUE", "Échoué"),
        ("EXPIRE", "Expiré"),
    ]
    class Meta:
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'

    id = models.AutoField(primary_key=True)
    telephone_paiement = models.CharField(max_length=15, help_text="Numéro Mobile Money utilisé pour le paiement")
    montant = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    motif = models.CharField(max_length=100, blank=True, null=True)
    initie_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)
    procedure = models.OneToOneField(Procedure, on_delete=models.CASCADE, related_name="paiement")
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default="EN_ATTENTE")
    reference_transaction = models.CharField(max_length=255, blank=True, null=True)
    response_data = models.JSONField(blank=True, null=True)

    @property
    def is_paiement_valide(self):
        return self.statut == "REUSSI"