from django.core.exceptions import ObjectDoesNotExist
from .models import Utilisateur, Role
from django.db.models import Q

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
        - Si aucun rôle n'est fourni → assigner automatiquement le rôle dont le libellé est 'users', 'user' ou 'utilisateur'
        (insensible à la casse)
        """

        # Vérifie si role_id est présent dans les données
        role_id = data.get("role_id")

        if role_id is not None:
            try:
                role = Role.objects.get(id=role_id)
            except ObjectDoesNotExist:
                raise ValueError("Role invalide")
        else:
            # Aucun role fourni → chercher par libellé
            try:
                role = Role.objects.get(
                    Q(libelle__iexact="users") |
                    Q(libelle__iexact="utilisateur") |
                    Q(libelle__iexact="user") |
                    Q(libelle__iexact="utilisateurs")
                )
            except ObjectDoesNotExist:
                raise ValueError("Aucun rôle par défaut (libellé 'users'/'user'/'utilisateur') n'existe dans la base")

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
