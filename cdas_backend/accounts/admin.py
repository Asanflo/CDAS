from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.forms import BaseInlineFormSet
from .models import Role, Permission, Utilisateur

#Inline pour la creation des permissions lors de la creation d'un role
class PermissionInline(admin.TabularInline):
    model = Role.permissions.through
    verbose_name = "Permission"
    verbose_name_plural = "Permissions liées au rôle"

#Ajout de la fonctionnalite liee aux roles
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("libelle", "description", "created_at")
    inlines = [PermissionInline]

#ajout de la fonctionnalite liee aux Utilisateurs
class UtilisateurAdmin(BaseUserAdmin):
    model = Utilisateur
    list_display = ("email", "nom", "telephone", "role", "is_active", "is_staff")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("email", "nom", "telephone")
    ordering = ("email",)

    # Définir les champs visibles lors de la modification d’un utilisateur
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Infos personnelles", {"fields": ("nom", "telephone", "role")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )

    # Définir les champs visibles lors de la création d’un utilisateur
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "nom", "telephone", "role", "password1", "password2", "is_active", "is_staff"),
            },
        ),
    )

# Enregistrer dans l’admin
admin.site.register(Utilisateur, UtilisateurAdmin)
#ajout de la fonctionnalite liee aux Permissions
@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ("codename", "description", "created_at")
    search_fields = ("codename",)

