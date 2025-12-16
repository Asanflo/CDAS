from django.urls import path, include

from .views import ProcedureInitialisationView

#URL patterns
urlpatterns = [
    path('initialisation/', ProcedureInitialisationView.as_view(), name="procedure_initialisation"),
]