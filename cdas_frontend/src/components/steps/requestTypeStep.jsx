import { useContext } from "react";
import { StepperContext } from "../../context/stepperContext";

const RequestTypeStep = () => {
    const {userData, setUserData} = useContext(StepperContext);

   const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            procedure: {
            ...userData.procedure,
            [name]: value
            }
        });
    };


    return (
        <div className="flex flex-col">
            {/* Type de procédure */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                    Type de procédure
                </label>

                <select
                    name="type"
                    value={userData.procedure.type}
                    onChange={handleChange}
                    className="
                        w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200
                    "
                >
                    <option value="">-- Sélectionner une procédure --</option>
                    <option value="authentification">Authentification de diplôme</option>
                    <option value="certification">Certification</option>
                </select>
            </div>

            {/* Motif */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                    Motif de la demande
                </label>

                <textarea
                    name="motif_procedure"
                    value={userData.procedure.motif_procedure}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ex : procédure de voyage, demande d’emploi, poursuite d’études…"
                    className="
                        w-full resize-none rounded-lg border border-gray-300 p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200
                    "
                />
            </div>
        </div>
    )
}

export default RequestTypeStep;