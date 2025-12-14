import { useContext, useEffect } from "react";
import { StepperContext } from "../../context/stepperContext";
import { CreditCard, Phone } from "lucide-react";

const PaymentStep = () =>{
    const { userData, setUserData } = useContext(StepperContext);

    const documentsCount = userData.documents?.length || 0;
    const requestType = userData.requestType;

    let unitPrice = 0;
    let total = 0;

    if (requestType === "certification") {
        unitPrice = 1500;
        total = documentsCount * unitPrice;
    }

    if (requestType === "authentification") {
        unitPrice = 25000;
        total = documentsCount * unitPrice;
    }

    // Sauvegarde dans le context
    useEffect(() => {
        setUserData(prev => ({
            ...prev,
            payment: {
                unitPrice,
                total
            }
        }));
    }, [unitPrice, total]);

    return(
        <div className="flex flex-col gap-6 animate-fadeIn">

            {/* <h3 className="text-lg font-semibold text-gray-800">
                Paiement
            </h3> */}

            {/* Résumé */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">

                <div className="flex justify-between">
                    <span className="text-gray-600">Type de procédure</span>
                    <span className="font-semibold capitalize">
                        {requestType}
                    </span>
                </div>

                {requestType === "authentification" || requestType === "certification" && (
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

            {/* Instructions de paiement */}
            <div className="bg-white border rounded-xl p-5 space-y-3 shadow-sm">

                <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                    <CreditCard />
                    Instructions de paiement
                </div>

                <p className="text-sm text-gray-600">
                    Veuillez effectuer le paiement via Mobile Money au numéro :
                </p>

                <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Phone />
                    <span>+237 6XX XXX XXX ou +237 6XX XXX XXX</span>
                </div>

                <p className="text-xs text-gray-500">
                    Le paiement doit être effectué avant la validation finale.
                </p>

            </div>

        </div>
    );
}

export default PaymentStep;