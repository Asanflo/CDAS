from django.core.exceptions import ValidationError
from django.db import transaction

from .models import Procedure, Etudiant, Document, Paiement
from .campay_clients import campay

@transaction.atomic
def initier_procedure(
    *,
    user,
    procedure_data,
    etudiant_data,
    documents_data,
    paiement_data
):
    #validation montant paiement
    if paiement_data["montant"] <= 0:
        raise ValidationError("Le montant doit être positif")

    if not documents_data or len(documents_data) == 0:
        raise ValidationError("Au moins un document est requis")

    # 1️⃣ Création procédure
    procedure = Procedure.objects.create(
        initiateur=user,
        **procedure_data
    )

    # 2️⃣ Création étudiant
    Etudiant.objects.create(
        procedure=procedure,
        **etudiant_data
    )

    # 3️⃣ Création documents
    for doc in documents_data:
        Document.objects.create(
            procedure=procedure,
            valeur=doc["valeur"]
        )

    # 4️⃣ Initialisation paiement
    Paiement.objects.create(
        procedure=procedure,
        montant=paiement_data["montant"],
        telephone_paiement=paiement_data["telephone_paiement"],
        motif=procedure.motif_procedure,
        statut="EN_ATTENTE"
    )

    return procedure


# def collect_payment(phone_number: str, amount: float, description: str, external_ref: str = "") -> dict:
#     """
#     Initie un paiement CamPay et retourne la réponse.
#     """
#     response = campay.collect({
#         "amount": str(amount),
#         "currency": "XAF",
#         "from": phone_number,
#         "description": description,
#         "external_reference": external_ref
#     })
#     return response


def collect_payment_cam_pay(paiement: Paiement):
    """
    Lance un paiement CamPay en mode non bloquant et stocke la référence.
    """
    response = campay.initCollect({
        "amount": str(paiement.montant),
        "currency": "XAF",
        "from": paiement.telephone_paiement,
        "description": paiement.motif,
        "external_reference": str(paiement.id)
    })

    # Stocke la référence de transaction et la réponse complète
    paiement.reference_transaction = response.get("reference")
    paiement.response_data = response
    paiement.save(update_fields=["reference_transaction", "response_data"])

    # Retourne le code USSD à afficher ou rediriger à l'utilisateur
    return response.get("ussd_code")


def verifier_statut_paiement(paiement: Paiement):
    if not paiement.reference_transaction:
        return

    status_data = campay.get_transaction_status({"reference": paiement.reference_transaction})
    statut = status_data.get("status")

    if statut == "SUCCESSFUL":
        paiement.statut = "REUSSI"
        paiement.procedure.statut = "VALIDEE"
    elif statut == "FAILED":
        paiement.statut = "ECHOUE"
        paiement.procedure.statut = "REJETEE"

    paiement.procedure.save(update_fields=["statut"])
    paiement.save(update_fields=["statut", "response_data"])