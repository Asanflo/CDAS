from django.db import transaction
from rest_framework import serializers

from .models import Procedure, Document, Etudiant, Paiement
from .services import initier_procedure

#Classe document pour l'ajout simultane de plusieurs objets
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['valeur']

#Classe etudiant pour l'ajout simultane de plusieurs objets
class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        exclude = ['procedure']

#Classe paiement pour l'ajout simultane de plusieurs objets
class PaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paiement
        fields = ['telephone_paiement', 'montant']

#Classe procedure pour l'ajout simultane de plusieurs objets
class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = ['type', 'motif_procedure']


#Serializer pour gerer l'initiation d'une procedure
class ProcedureInitialisationSerializer(serializers.Serializer):
    procedure = ProcedureSerializer()
    etudiant = EtudiantSerializer()
    documents = DocumentSerializer(many=True)
    paiement = PaiementSerializer()

    def create(self, validated_data):
        return initier_procedure(
            user=self.context["request"].user,
            procedure_data=validated_data["procedure"],
            etudiant_data=validated_data["etudiant"],
            documents_data=validated_data["documents"],
            paiement_data=validated_data["paiement"]
        )


class DocumentReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            "id",
            "valeur",
            "conformite",
            "certification",
            "signature_directeur",
            "approbation_rectorat",
            "cree_le"
        ]

class EtudiantReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = "__all__"

class PaiementReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paiement
        fields = [
            "id",
            "telephone_paiement",
            "montant",
            "statut",
            "reference_transaction",
            "initie_le",
        ]

class ProcedureReadSerializer(serializers.ModelSerializer):
    etudiant = EtudiantReadSerializer(read_only=True)
    paiement = PaiementReadSerializer(read_only=True)
    documents = serializers.SerializerMethodField()

    class Meta:
        model = Procedure
        fields = [
            "id",
            "type",
            "motif_procedure",
            "statut",
            "cree_le",
            "etudiant",
            "paiement",
            "documents",
        ]

    def get_documents(self, obj):
        docs = Document.objects.filter(procedure=obj)
        return DocumentReadSerializer(docs, many=True).data


class PaiementListSerializer(serializers.ModelSerializer):
    procedure_id = serializers.IntegerField(source="procedure.id", read_only=True)
    type_procedure = serializers.CharField(source="procedure.type", read_only=True)

    class Meta:
        model = Paiement
        fields = [
            "id",
            "procedure_id",
            "type_procedure",
            "telephone_paiement",
            "montant",
            "statut",
            "initie_le",
        ]



