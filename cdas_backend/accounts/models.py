from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Create your models here.
class UtilisateurManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("is_staff doit être True pour un superuser")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("is_superuser doit être True pour un superuser")

        if "role" not in extra_fields:
            role_admin, created = Role.objects.get_or_create(
                libelle="Admin",
                defaults={"description": "Super admin"}
            )
            extra_fields["role"] = role_admin

        return self.create_user(email, password, **extra_fields)



class Utilisateur(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, unique=True)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    role = models.ForeignKey("Role", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nom", "telephone"]

    objects = UtilisateurManager()

    def __str__(self):
        return self.nom if self.nom else self.email

    def has_permission(self, codename: str) -> bool:
        """
        Vérifie si l'utilisateur possède la permission avec le codename donné.
        """
        if not self.role:
            return False
        return self.role.permissions.filter(codename=codename).exists()

class Role(models.Model):
    class Meta:
        verbose_name = "Role"
        verbose_name_plural = "Roles"

    id = models.AutoField(primary_key=True)
    libelle = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    permissions = models.ManyToManyField("Permission", related_name="roles", blank=True)


    def __str__(self):
        return self.libelle

class Permission(models.Model):
    class Meta:
        verbose_name = "Permission"
        verbose_name_plural = "Permissions"

    id = models.AutoField(primary_key=True)
    codename = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.codename