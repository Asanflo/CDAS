import { useContext } from "react";
import { StepperContext } from "../../context/stepperContext";
import { Upload, FileCheck } from "lucide-react";

const PaymentProofStep = () => {
    const { userData, setUserData } = useContext(StepperContext);

    const handleProofUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUserData(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                proof: file
            }
        }));
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">

            <h3 className="text-lg font-semibold text-gray-800">
                Preuve de paiement
            </h3>

            <label className="
                flex flex-col items-center justify-center
                border-2 border-dashed border-green-400
                rounded-xl p-8 cursor-pointer
                hover:bg-green-50 transition
            ">
                <Upload size={32} className="text-green-600 mb-2" />
                <p className="font-medium text-gray-700">
                    Cliquez pour téléverser la preuve de paiement
                </p>
                <p className="text-sm text-gray-500">
                    Image ou PDF
                </p>

                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleProofUpload}
                    className="hidden"
                />
            </label>

            {userData.payment?.proof && (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <FileCheck />
                    {userData.payment.proof.name}
                </div>
            )}

        </div>
    );
};

export default PaymentProofStep;
