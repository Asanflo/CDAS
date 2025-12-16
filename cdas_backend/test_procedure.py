import httpx
import os

BASE_URL = "http://127.0.0.1:8000/api/v1"

# ================================
# 1️⃣ Authentification (JWT)
# ================================
login_data = {
    "email": "test@example.com",
    "password": "123456"
}

with httpx.Client() as client:
    response = client.post(f"{BASE_URL}/auth/token/", json=login_data)
    response.raise_for_status()
    access_token = response.json()["access"]

print("Access token:", access_token)

headers = {
    "Authorization": f"Bearer {access_token}"
}

# ================================
# 2️⃣ Données formulaire (sans fichiers)
# ================================
data = {
    # Procedure
    "procedure[type]": "Authentification",
    "procedure[motif_procedure]": "Inscription 2026",

    # Étudiant
    "etudiant[matricule]": "2026-001",
    "etudiant[nom]": "Duont",
    "etudiant[prenom]": "Jen",
    "etudiant[email]": "jen.dupont@test.com",
    "etudiant[telephone]": "699000000",

    # Paiement
    "paiement[telephone_paiement]": "237699999999",
    "paiement[montant]": "10",
}

# ================================
# 3️⃣ Fichiers (multipart/form-data)
# ================================
files = [
    (
        "documents[0][valeur]",
        (
            "Clickjacking.pdf",
            open("/home/florentin/Documents/Livres/Clickjacking.pdf", "rb"),
            "application/pdf"
        )
    ),
    (
        "documents[1][valeur]",
        (
            "CAMUS-Letranger.pdf",
            open("/home/florentin/Documents/Livres/CAMUS-Letranger.pdf", "rb"),
            "application/pdf"
        )
    ),
]

# ================================
# 4️⃣ Envoi de la requête
# ================================
with httpx.Client() as client:
    resp = client.post(
        f"{BASE_URL}/procedures/initialisation/",
        headers=headers,
        data=data,
        files=files
    )

# ================================
# 5️⃣ Résultat
# ================================
print("Status:", resp.status_code)

try:
    print(resp.json())
except Exception:
    print(resp.text)
