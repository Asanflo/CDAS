from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurViewSet, InscriptionView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Router pour le ViewSet utilisateurs
router = DefaultRouter()
router.register("utilisateurs", UtilisateurViewSet, basename="utilisateurs")

# URL patterns
urlpatterns = [
    # Routes JWT
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('inscription/', InscriptionView.as_view(), name='inscription'),
# Auth JWT / registration
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),

    # OAuth providers
    path('social/', include('allauth.socialaccount.urls')),

    # Routes du ViewSet
    path("", include(router.urls)),
]

