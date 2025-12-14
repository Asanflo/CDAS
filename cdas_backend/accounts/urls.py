from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurViewSet, InscriptionView, GoogleLogin
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

    # OAuth providers
    path('google/', include('allauth.socialaccount.urls')),
    path('google/login/', GoogleLogin.as_view(), name='google_login'),

    # Routes du ViewSet
    path("", include(router.urls)),
]

