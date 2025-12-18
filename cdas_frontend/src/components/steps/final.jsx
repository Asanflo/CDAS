import { useContext } from "react";
import { StepperContext } from "../../context/stepperContext";
import { CheckCircle } from "lucide-react";

const FinalStep = () => {
  const { userData } = useContext(StepperContext);

//   const documentsCount = userData.documents?.length || 0;
//   const payment = userData.paiement || {};

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">

      <h3 className="text-lg font-semibold text-gray-800">
        Récapitulatif de la demande
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Section title="Procédure">
          <p>Type : <b>{userData.procedure.type || "-"}</b></p>
          <p>Motif : {userData.procedure.motif_procedure || "-"}</p>
        </Section>

        <Section title="Informations personnelles">
          <p>{userData.etudiant.nom || "-"} {userData.etudiant.prenom || "-"}</p>
          <p>Matricule : {userData.etudiant.matricule || "-"}</p>
          <p>Filière : {userData.etudiant.filiere || "-"}</p>
          <p>École : {userData.etudiant.ecole || "-"}</p>
          <p>Moyenne : {userData.etudiant.moyenne_generale || "-"}</p>
        </Section>

        <Section title="Documents">
          <p>{userData.documents.length} document(s) téléversé(s)</p>
        </Section>

        <Section title="Paiement">
          <p>Total : <b>{userData.paiement.montant} FCFA</b></p>
          <p>Téléphone : {userData.paiement.telephone_paiement}</p>
        </Section>

      </div>

      <div className="flex items-center gap-2 text-green-600 font-semibold">
        <CheckCircle />
        Toutes les informations sont prêtes à être soumises
      </div>

    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
    <div className="text-sm text-gray-600 space-y-1">
      {children}
    </div>
  </div>
);

export default FinalStep;
