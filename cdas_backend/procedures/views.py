from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import ValidationError
from rest_framework.views import APIView

from .models import Paiement, Procedure
from .serializers import ProcedureInitialisationSerializer, ProcedureReadSerializer, PaiementListSerializer


class ProcedureInitialisationView(GenericAPIView):
    """
    Initialisation d'une procédure avec pièces jointes.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ProcedureInitialisationSerializer

    def post(self, request, *args, **kwargs):

        # 🔐 Vérification permission métier
        if not request.user.has_permission("procedure.create"):
            return Response(
                {"detail": "Vous n'avez pas la permission de créer une procédure."},
                status=status.HTTP_403_FORBIDDEN
            )

        # 🧱 Reconstruction du JSON attendu par le serializer
        data = {
            "procedure": {
                "type": request.data.get("procedure[type]"),
                "motif_procedure": request.data.get("procedure[motif_procedure]"),
            },
            "etudiant": {
                "matricule": request.data.get("etudiant[matricule]"),
                "nom": request.data.get("etudiant[nom]"),
                "prenom": request.data.get("etudiant[prenom]"),
            },
            "paiement": {
                "telephone_paiement": request.data.get("paiement[telephone_paiement]"),
                "montant": request.data.get("paiement[montant]"),
            },
            "documents": []
        }

        # 📎 Récupération dynamique des fichiers
        index = 0
        while True:
            file = request.FILES.get(f"documents[{index}][valeur]")
            if not file:
                break
            data["documents"].append({"valeur": file})
            index += 1

        # ✅ Validation serializer
        serializer = self.get_serializer(
            data=data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        try:
            procedure = serializer.save()
        except ValidationError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 📤 Réponse
        return Response(
            {"id": procedure.id},
            status=status.HTTP_201_CREATED
        )

    def get(self, request, *args, **kwargs):
        procedures = (
            Procedure.objects
            .filter(initiator=request.user)
            .order_by("-cree_le")
        )

        serializer = ProcedureReadSerializer(procedures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#Vue permettant de mettre le statut du paiement et de la procedure
@method_decorator(csrf_exempt, name="dispatch")
class CamPayWebhookView(APIView):
    """
    Webhook CamPay
    - Pas d'auth utilisateur
    - Pas de CSRF
    - Sécurisé par X-CAMPAY-KEY
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        reference = request.data.get("reference")
        status_campay = request.data.get("status")

        if not reference or not status_campay:
            return Response(
                {"detail": "Requête invalide, champs manquants"},
                status=status.HTTP_400_BAD_REQUEST
            )

        reference = data.get("reference")
        status_campay = data.get("status")

        if not reference:
            return Response(
                {"detail": "Reference manquante"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            paiement = Paiement.objects.select_related("procedure").get(
                reference_transaction=reference
            )
        except Paiement.DoesNotExist:
            return Response(
                {"detail": "Paiement introuvable"},
                status=status.HTTP_404_NOT_FOUND
            )

        # 🔁 Idempotence (très important)
        if paiement.statut in ["REUSSI", "ECHOUE"]:
            return Response({"status": "already_processed"})

        # 🔄 Mise à jour des statuts
        if status_campay == "SUCCESSFUL":
            paiement.statut = "REUSSI"
            paiement.procedure.statut = "VALIDEE"

        elif status_campay == "FAILED":
            paiement.statut = "ECHOUE"
            paiement.procedure.statut = "REJETEE"

        paiement.response_data = data
        paiement.procedure.save(update_fields=["statut"])
        paiement.save(update_fields=["statut", "response_data"])

        return Response({"status": "ok"}, status=status.HTTP_200_OK)

    def get(self, request):
        """
        Lorsque Campay appelle la methode en GET
        """
        data = request.GET
        reference = data.get("reference")
        if not reference:
            return Response({"detail": "Reference manquante"}, status=400)

        return Response({"status": "ok"})

class PaiementListView(ListAPIView):
    """
    Endpoint pour voir la liste des paiements d'un utilisateur
    """

    serializer_class = PaiementListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Paiement.objects
            .filter(procedure__initiator=self.request.user)
            .select_related("procedure")
            .order_by("-initie_le")
        )