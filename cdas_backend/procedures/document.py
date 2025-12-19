from procedures.traitement_document import DateStamper, ImageStamper
from django.conf import settings
import os
import django

# ===============================
# Initialiser Django
# ===============================
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cdas_backend.settings")
django.setup()

# ===============================
# Définir les chemins
# ===============================
input_pdf = os.path.join(settings.MEDIA_ROOT, "documents/Clickjacking.pdf")
temp_pdf = os.path.join(settings.MEDIA_ROOT, "Clickjacking_temp.pdf")
output_pdf = os.path.join(settings.MEDIA_ROOT, "Clickjacking_approuv.pdf")
image_stamp = os.path.join(settings.MEDIA_ROOT, "icones/dr_cachet.png")

# -------------------------------
# 2️⃣ Ajouter l'image sur le PDF déjà modifié
# -------------------------------
stamper_image = ImageStamper(input_pdf)  # on lit le PDF temporaire avec la date
stamper_image.add_image(output_path=temp_pdf,
                        image_path=image_stamp,
                        position=(500, 50),
                        width=120, height=100)

# -------------------------------
# 1️⃣ Ajouter la date
# -------------------------------
stamper_date = DateStamper(temp_pdf)
stamper_date.add_date(output_path=output_pdf, position=(590, 110), font_size=18, color="green")



# -------------------------------
# 3️⃣ Supprimer le PDF temporaire si tu veux
# -------------------------------
if os.path.exists(temp_pdf):
    os.remove(temp_pdf)

print(f"✓ Terminé ! Vérifiez le fichier : {output_pdf}")
