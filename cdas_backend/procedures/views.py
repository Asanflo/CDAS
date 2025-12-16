from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import ValidationError
from rest_framework.views import APIView

from .models import Paiement, Procedure
from .serializers import ProcedureInitialisationSerializer

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
                "email": request.data.get("etudiant[email]"),
                "telephone": request.data.get("etudiant[telephone]"),
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

