from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Paiement
from .services import collect_payment_cam_pay

@receiver(post_save, sender=Paiement)
def trigger_payment(sender, instance: Paiement, created, **kwargs):
    """
    Dès qu'un Paiement est créé, on initie le paiement via CamPay.
    """
    if created and instance.statut == "EN_ATTENTE" and not instance.reference_transaction:
        # Appelle le service qui interagit avec CamPay
        collect_payment_cam_pay(instance)
