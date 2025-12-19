import DocumentViewer from "./documentViewer";

const ProcedureDetails = ({ procedure }) => {
  return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg">Informations</h3>
        <p>Nom : {procedure.etudiant.nom}</p>
        <p>Matricule : {procedure.etudiant.matricule}</p>
        <p>Motif : {procedure.procedure.motif_procedure}</p>
      </div>

      <DocumentViewer documents={procedure.documents} />
    </div>
  );
};

export default ProcedureDetails;
