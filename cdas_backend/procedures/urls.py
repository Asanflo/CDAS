from django.urls import path, include

from .views import ProcedureInitialisationView, CamPayWebhookView, PaiementListView

#URL patterns
urlpatterns = [
    path('initialisation/', ProcedureInitialisationView.as_view(), name="procedure_initialisation"),
    path('paiements/', PaiementListView.as_view(), name="paiements_list"),
    path('campay/webhook/', CamPayWebhookView.as_view(), name="procedure_campay_webhook"),
]