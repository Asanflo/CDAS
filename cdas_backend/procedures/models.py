from django.db import models

from ..accounts.models import Utilisateur

# Create your models here.

class Procedure(models.Model):
    class Meta:
        verbose_name = 'Procedure'
        verbose_name_plural = 'Procedures'

    id = models.AutoField(primary_key=True)
    initiateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    motif_procedure = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=100, default='En cours')
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Procedure {self.id},{self.type} de {self.initiateur}"

class Document(models.Model):
    class Meta:
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'

    id = models.AutoField(primary_key=True)
    url = models.FilePathField(blank=True, null=True)
    procedure = models.ForeignKey(Procedure, on_delete=models.CASCADE)
    valeur = models.FileField(blank=True, null=True)
    conformite = models.BooleanField(default=False)
    certification = models.BooleanField(default=False)
    signature_directeur = models.BooleanField(default=False)
    approbation_rectorat = models.BooleanField(default=False)
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Document {self.id},{self.url}"

class Etudiant(models.Model):
    class Meta:
        verbose_name = 'Etudiant'
        verbose_name_plural = 'Etudiants'

    id = models.AutoField(primary_key=True)
    matricule = models.CharField(max_length=100)
    nom = models.CharField(max_length=100, blank=True, null=True)
    prenom = models.CharField(max_length=100, blank=True, null=True)
    filiere = models.CharField(max_length=100, blank=True, null=True)
    ecole = models.CharField(max_length=100, blank=True, null=True)
    moyenne_generale = models.DecimalField(max_digits=2, decimal_places=2, blank=True, null=True)

class ReponseProcedure(models.Model):
    class Meta:
        verbose_name = 'Response Procedure'
        verbose_name_plural = 'Response Procedures'

    id = models.AutoField(primary_key=True)
    titre = models.CharField(max_length=100)
    contenu = models.TextField(blank=True, null=True)
    procedure_liee = models.ForeignKey(Procedure, on_delete=models.CASCADE)
