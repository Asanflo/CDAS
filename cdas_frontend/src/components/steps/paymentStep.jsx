import { useContext, useEffect } from "react";
import { StepperContext } from "../../context/stepperContext";
import { CreditCard, Phone } from "lucide-react";

const PaymentStep = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const documentsCount = userData.documents.length;
  const requestType = userData.procedure.type;

  const PRICE_MAP = {
    certification: 1500,
    authentification: 25000
  };

  const unitPrice = PRICE_MAP[requestType] || 0;
  const total = documentsCount * unitPrice;

  useEffect(() => {
    if (!requestType) return;

    const PRICE_MAP = { certification: 1500, authentification: 25000 };
    const unitPrice = PRICE_MAP[requestType] || 0;
    const total = documentsCount * unitPrice;

    setUserData(prev => ({
        ...prev,
        paiement: {
        ...prev.paiement,
        montant: total
        }
    }));
   }, [requestType, documentsCount, total, setUserData]);

    // Gestion du changement du numéro de paiement
  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setUserData(prev => ({
      ...prev,
      paiement: {
        ...prev.paiement,
        telephone_paiement: value
      }
    }));
  };


  return (
    <div className="flex flex-col gap-6 animate-fadeIn">

      {/* Résumé */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-600">Type de procédure</span>
          <span className="font-semibold capitalize">
            {requestType || "-"}
          </span>
        </div>

        {(requestType === "authentification" || requestType === "certification") && (
          <div className="flex justify-between">
            <span className="text-gray-600">Nombre de documents</span>
            <span className="font-semibold">{documentsCount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Prix unitaire</span>
          <span className="font-semibold">
            {unitPrice.toLocaleString()} FCFA
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-bold">
          <span>Total à payer</span>
          <span className="text-indigo-700">
            {total.toLocaleString()} FCFA
          </span>
        </div>

      </div>

      {/* Champ de saisie du numéro de paiement */}
      <div className="bg-white border rounded-xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold">
          <CreditCard />
          Numéro de paiement
        </div>

        <input
          type="tel"
          placeholder="Entrez votre numéro Mobile Money"
          value={userData.paiement?.telephone_paiement || ""}
          onChange={handlePaymentChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <p className="text-xs text-gray-500">
          Le paiement sera initié via ce numéro. Assurez-vous qu'il soit correct.
        </p>
      </div>

    </div>
  );
};

export default PaymentStep;
