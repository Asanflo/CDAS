const ProcedureTable = ({ procedures, onSelect }) => {
  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="p-2">Étudiant</th>
          <th className="p-2">Matricule</th>
          <th className="p-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        {procedures.map(proc => (
          <tr
            key={proc.id}
            onClick={() => onSelect(proc)}
            className="cursor-pointer hover:bg-indigo-50"
          >
            <td className="p-2">{proc.etudiant.nom}</td>
            <td className="p-2">{proc.etudiant.matricule}</td>
            <td className="p-2">{proc.statut}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProcedureTable;
