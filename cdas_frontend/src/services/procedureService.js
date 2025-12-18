import api from "../api/axios";

/**
 * Envoie la procédure, étudiant, documents et paiement au backend
 * @param {Object} data - Les données du formulaire
 * {
 *   procedure: { type, motif_procedure },
 *   etudiant: { id, matricule, nom, prenom, filiere, ecole, moyenne_generale },
 *   documents: [File | { valeur: string }],
 *   paiement: { telephone_paiement, montant }
 * }
 * * @param {string} token - Le token d'authentification
 */

export const initialiserProcedure = async (data) => {

    const formData = new FormData();
    
    // procedure
    formData.append("procedure[type]", data.procedure.type);
    formData.append("procedure[motif_procedure]", data.procedure.motif_procedure);

    // etudiant
    formData.append("etudiant[id]", data.etudiant.id);
    formData.append("etudiant[matricule]", data.etudiant.matricule);
    formData.append("etudiant[nom]", data.etudiant.nom);
    formData.append("etudiant[prenom]", data.etudiant.prenom);
    formData.append("etudiant[filiere]", data.etudiant.filiere);
    formData.append("etudiant[ecole]", data.etudiant.ecole);
    formData.append("etudiant[moyenne_generale]", data.etudiant.moyenne_generale);

    // documents (tableau)
    data.documents.forEach((doc, index) => {
        // si c’est un fichier
        if (doc instanceof File) {
        formData.append(`documents[${index}][valeur]`, doc);
        } else {
        formData.append(`documents[${index}][valeur]`, doc.valeur);
        }
    });

    if (data.documents.length === 0) {
    alert("Ajoutez au moins un document !");
    return;
    }


    // paiement
    formData.append("paiement[telephone_paiement]", data.paiement.telephone_paiement);
    formData.append("paiement[montant]", data.paiement.montant);

    // jpour lister les donnees dans la console 
// for (let pair of formData.entries()) {
//     console.log(pair[0], ":", pair[1]);
// }

// console.log("Token envoyé :", localStorage.getItem("access_token"));
console.log("TOKEN =", localStorage.getItem("access_token"));


    
    // appel API
    const response = await api.post("/v1/procedures/initialisation/", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    });

    return response.data;

};