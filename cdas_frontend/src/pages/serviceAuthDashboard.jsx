import { useEffect, useState } from "react";
import ProcedureTable from "../components/procedureTable";
import ProcedureDetails from "../components/procedureDetails";
import api from "../api/axios";

const AuthDashboard = () => {
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      const res = await api.get("/v1/procedures/");
      setProcedures(res.data);
    };
    fetchProcedures();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Liste des procédures */}
      <div className="w-1/2 p-6 overflow-y-auto border-r">
        <h2 className="text-xl font-bold mb-4">Procédures – Authentification et Certification</h2>
        <ProcedureTable
          procedures={procedures}
          onSelect={setSelectedProcedure}
        />
      </div>

      {/* Détails */}
      <div className="w-1/2 p-6">
        {selectedProcedure ? (
          <ProcedureDetails procedure={selectedProcedure} />
        ) : (
          <p className="text-gray-500">Sélectionnez une procédure</p>
        )}
      </div>

    </div>
  );
};

export default AuthDashboard;
