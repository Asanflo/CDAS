# Utilise une image Python légère
FROM python:3.12-slim

# Empêche Python d'écrire des fichiers .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Empêche Python de bufferiser les logs (utile pour docker logs)
ENV PYTHONUNBUFFERED 1

# Créer un répertoire app
WORKDIR /app

# Installer dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copier requirements
COPY requirements.txt .

# Installer les dépendances dans le venv
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copier ton code
COPY . .

# Expose port Django
EXPOSE 8000

# Commande de démarrage (modifiable pour gunicorn)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
