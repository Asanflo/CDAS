from rest_framework import serializers
from .models import Utilisateur, Role
from .services import UtilisateurService

class UtilisateurRegisterSerializer(serializers.Serializer):
    nom = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    telephone = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)
    role_id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        return UtilisateurService.creer_utilisateur(validated_data)

class UtilisateurSerializer(serializers.ModelSerializer):
    role = serializers.StringRelatedField()
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), source="role", write_only=True
    )

    class Meta:
        model = Utilisateur
        fields = ["id", "nom", "email", "telephone", "role", "role_id", "is_active", "created_at"]
        read_only_fields = ["created_at"]

