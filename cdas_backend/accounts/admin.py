from django.contrib import admin
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
@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ("nom", "email", "telephone", "role", "is_active", "is_staff")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("nom", "email", "telephone")

#ajout de la fonctionnalite liee aux Permissions
@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ("codename", "description", "created_at")
    search_fields = ("codename",)

