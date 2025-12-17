from django.urls import path, include

from .views import ProcedureInitialisationView, CamPayWebhookView

#URL patterns
urlpatterns = [
    path('initialisation/', ProcedureInitialisationView.as_view(), name="procedure_initialisation"),
    path('campay/webhook/', CamPayWebhookView.as_view(), name="procedure_campay_webhook"),
]