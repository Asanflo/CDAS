from django.contrib import admin
from .models import Procedure, Document, Etudiant, ReponseProcedure, Paiement

# -------------------------------
# Admin pour Procedure
# -------------------------------
@admin.register(Procedure)
class ProcedureAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'initiateur', 'statut', 'cree_le', 'modifie_le')
    list_filter = ('statut', 'type', 'cree_le')
    search_fields = ('type', 'motif_procedure', 'initiateur__username', 'initiateur__email')
    ordering = ('-cree_le',)
    readonly_fields = ('cree_le', 'modifie_le')


# -------------------------------
# Admin pour Document
# -------------------------------
@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'procedure', 'valeur', 'conformite', 'certification',
                    'signature_directeur', 'approbation_rectorat', 'cree_le', 'modifie_le')
    list_filter = ('conformite', 'certification', 'signature_directeur', 'approbation_rectorat')
    search_fields = ('procedure__type',)
    readonly_fields = ('cree_le', 'modifie_le')


# -------------------------------
# Admin pour Etudiant
# -------------------------------
@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('id', 'matricule', 'nom', 'prenom', 'filiere', 'ecole', 'procedure')
    search_fields = ('matricule', 'nom', 'prenom', 'filiere', 'ecole')
    ordering = ('matricule',)


# -------------------------------
# Admin pour ReponseProcedure
# -------------------------------
@admin.register(ReponseProcedure)
class ReponseProcedureAdmin(admin.ModelAdmin):
    list_display = ('id', 'titre', 'procedure_liee', 'genere_le', 'modifie_le')
    search_fields = ('titre', 'contenu', 'procedure_liee__type')
    readonly_fields = ('genere_le', 'modifie_le')
    ordering = ('-genere_le',)


# -------------------------------
# Admin pour Paiement
# -------------------------------
@admin.register(Paiement)
class PaiementAdmin(admin.ModelAdmin):
    list_display = ('id', 'procedure', 'telephone_paiement', 'montant', 'statut', 'reference_transaction', 'initie_le', 'modifie_le')
    list_filter = ('statut',)
    search_fields = ('procedure__type', 'telephone_paiement', 'reference_transaction')
    readonly_fields = ('initie_le', 'modifie_le', 'response_data')
    ordering = ('-initie_le',)
