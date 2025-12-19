import django
from PyPDF2 import PdfReader, PdfWriter
from django.conf import settings
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import io
import os

# ==============================
# CONFIGURATION
# ==============================
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cdas_backend.settings")
django.setup()

FONT_PATH = os.path.join(settings.MEDIA_ROOT, "icones/ARIALBD 1.TTF")

COLORS = {
    "green": (34, 139, 34, 255),
    "red": (220, 20, 60, 255),
    "blue": (30, 144, 255, 255),
    "black": (0, 0, 0, 255),
}

# ==============================
# DATE STAMPER
# ==============================
class DateStamper:
    """Ajoute une date sur un PDF à des coordonnées exactes"""

    def __init__(self, input_pdf_path):
        if not os.path.exists(input_pdf_path):
            raise FileNotFoundError(f"{input_pdf_path} introuvable")
        self.reader = PdfReader(input_pdf_path)

    def _create_date_image(self, text, font_size, color):
        font = ImageFont.truetype(FONT_PATH, font_size)

        dummy = Image.new("RGBA", (1, 1))
        draw = ImageDraw.Draw(dummy)
        bbox = draw.textbbox((0, 0), text, font=font)

        width = bbox[2] - bbox[0] + 30
        height = bbox[3] - bbox[1] + 30

        img = Image.new("RGBA", (width, height), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        draw.text((15, 15), text, fill=COLORS[color], font=font)

        return img

    def add_date(
        self,
        output_path,
        position=(100, 100),
        font_size=120,
        color="green",
        text=None
    ):
        if text is None:
            text = datetime.now().strftime("%d/%m/%Y")

        writer = PdfWriter()
        date_img = self._create_date_image(text, font_size, color)

        for page in self.reader.pages:
            page_w = float(page.mediabox.width)
            page_h = float(page.mediabox.height)

            packet = io.BytesIO()
            c = canvas.Canvas(packet, pagesize=(page_w, page_h))

            img_io = io.BytesIO()
            date_img.save(img_io, "PNG")
            img_io.seek(0)

            c.drawImage(
                ImageReader(img_io),
                position[0],
                position[1],
                width=date_img.width,
                height=date_img.height,
                mask="auto",
            )

            c.save()
            packet.seek(0)
            page.merge_page(PdfReader(packet).pages[0])
            writer.add_page(page)

        with open(output_path, "wb") as f:
            writer.write(f)

        return output_path


# ==============================
# IMAGE STAMPER
# ==============================
class ImageStamper:
    """Ajoute une image PNG sur un PDF à des coordonnées exactes"""

    def __init__(self, input_pdf_path):
        if not os.path.exists(input_pdf_path):
            raise FileNotFoundError(f"{input_pdf_path} introuvable")
        self.reader = PdfReader(input_pdf_path)

    def add_image(
        self,
        output_path,
        image_path,
        position=(100, 100),
        width=None,
        height=None,
    ):
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"{image_path} introuvable")

        img = Image.open(image_path).convert("RGBA")
        if width and height:
            img = img.resize((width, height))

        writer = PdfWriter()

        for page in self.reader.pages:
            page_w = float(page.mediabox.width)
            page_h = float(page.mediabox.height)

            packet = io.BytesIO()
            c = canvas.Canvas(packet, pagesize=(page_w, page_h))

            img_io = io.BytesIO()
            img.save(img_io, "PNG")
            img_io.seek(0)

            c.drawImage(
                ImageReader(img_io),
                position[0],
                position[1],
                width=img.width,
                height=img.height,
                mask="auto",
            )

            c.save()
            packet.seek(0)
            page.merge_page(PdfReader(packet).pages[0])
            writer.add_page(page)

        with open(output_path, "wb") as f:
            writer.write(f)

        return output_path
