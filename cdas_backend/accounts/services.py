from django.core.exceptions import ObjectDoesNotExist
from .models import Utilisateur, Role

class UtilisateurService:

    @staticmethod
    def creer_utilisateur(data):
        try:
            role = Role.objects.get(id=data["role_id"])
        except ObjectDoesNotExist:
            raise ValueError("Role invalide")

        utilisateur = Utilisateur(
            nom=data["nom"],
            email=data["email"],
            telephone=data["telephone"],
            role=role,
        )
        utilisateur.set_password(data["password"])
        utilisateur.save()

        return utilisateur

    @staticmethod
    def create_user_with_default_role(data):
        """
        Création d'un utilisateur en appliquant la règle métier :
        - Si aucun rôle n'est fourni → assigner automatiquement le rôle ID=1
        """
        # Vérifie si role_id est présent dans les données
        role_id = data.get("role_id")

        if role_id is not None:
            try:
                role = Role.objects.get(id=role_id)
            except ObjectDoesNotExist:
                raise ValueError("Role invalide")
        else:
            # Aucun role fourni → prendre le rôle ID=1
            try:
                role = Role.objects.get(id=1)
            except ObjectDoesNotExist:
                raise ValueError("Aucun rôle par défaut (ID=1) n'existe dans la base")

        # Créer l'utilisateur
        utilisateur = Utilisateur(
            nom=data["nom"],
            email=data["email"],
            telephone=data["telephone"],
            role=role,
        )
        utilisateur.set_password(data["password"])
        utilisateur.save()
        return utilisateur
