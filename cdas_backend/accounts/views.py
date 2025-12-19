from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

from .models import Utilisateur
from .serializers import UtilisateurSerializer, UtilisateurRegisterSerializer
from .services import UtilisateurService

#View d'inscription d'un utilisateur
class InscriptionView(GenericAPIView):
    """
        Endpoint pour l'inscription d'un nouvel utilisateur.
        Accessible sans authentification (AllowAny).
    """
    permission_classes = [AllowAny]
    serializer_class = UtilisateurRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = UtilisateurService.create_user_with_default_role(
                serializer.validated_data
            )
        except ValueError as e:
            print(e)
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            UtilisateurSerializer(user).data,
            status=status.HTTP_201_CREATED
        )



#Vue gestion utilisateur
class UtilisateurViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les utilisateurs :
    - list, retrieve, update, destroy : IsAuthenticated
    - me : informations de l'utilisateur connecté
    """
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [IsAuthenticated]  # par défaut

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Renvoie les informations de l'utilisateur connecté
        GET /utilisateurs/me/
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class GoogleLogin(SocialLoginView):
    """
    Authentification via google
    """
    adapter_class = GoogleOAuth2Adapter