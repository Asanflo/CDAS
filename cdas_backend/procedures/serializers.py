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
