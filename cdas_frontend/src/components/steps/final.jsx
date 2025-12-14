import { useContext } from "react";
import { StepperContext } from "../../context/stepperContext";
import { CheckCircle } from "lucide-react";

const FinalStep = () => {
    const { userData } = useContext(StepperContext);

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">

            <h3 className="text-lg font-semibold text-gray-800">
                Récapitulatif de la demande
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Section title="Procédure" className="bg-amber-200 rounded-xl shadow p-5">
                    <p>Type : <b>{userData.requestType}</b></p>
                    <p>Motif : {userData.motif}</p>
                </Section>

                <Section title="Informations personnelles">
                    <p>{userData.lastName} {userData.firstName}</p>
                    <p>Email : {userData.email}</p>
                    <p>Téléphone : {userData.phone}</p>
                </Section>

                <Section title="Documents">
                    <p>{userData.documents.length} document(s) téléversé(s)</p>
                </Section>

                <Section title="Paiement">
                    <p>Total payé : <b>{userData.payment.total.toLocaleString()} FCFA</b></p>
                    <p>Preuve : {userData.payment.proof.name}</p>
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
    <div>
        <h4 className="font-semibold text-gray-700 mb-1">{title}</h4>
        <div className="text-sm text-gray-600 space-y-1">
            {children}
        </div>
    </div>
);

export default FinalStep;