import { useContext  } from "react";
import { StepperContext } from "../../context/stepperContext"; 

const PersonalInfosStep = () => {
    const { userData, setUserData } = useContext(StepperContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className="flex flex-col gap-6 animate-fadeIn">

            {/* <h3 className="text-lg font-semibold text-gray-800">
                Informations personnelles
            </h3> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nom */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Matricule
                    </label>
                    <input
                        type="text"
                        name="matricule"
                        value={userData.matricule || ""}
                        onChange={handleChange}
                        placeholder="Ex : 24G093454"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

                {/* Nom */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName || ""}
                        onChange={handleChange}
                        placeholder="Ex : Mamba"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

                {/* Prénom */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Prénom
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName || ""}
                        onChange={handleChange}
                        placeholder="Ex : Ozone"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

                {/* Filiere */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Filière
                    </label>
                    <input
                        type="text"
                        name="filiere"
                        value={userData.filiere || ""}
                        onChange={handleChange}
                        placeholder="Ex: Genie informatique"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

                {/* Ecole */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Ecole
                    </label>
                    <input
                        type="text"
                        name="ecole"
                        value={userData.ecole || ""}
                        onChange={handleChange}
                        placeholder="Ex: ENSPD"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

                {/* Sexe
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Sexe
                    </label>
                    <select
                        name="gender"
                        value={userData.gender || ""}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    >
                        <option value="">-- Sélectionner --</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                </div> */}

                {/* Moyenne */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Moyenne Générale
                    </label>
                    <input
                        type="number"
                        name="moyenne"
                        value={userData.moyenne || ""}
                        onChange={handleChange}
                        placeholder="00"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3
                        text-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                        transition-all duration-200"
                    />
                </div>

            </div>
        </div>
    )

}

export default PersonalInfosStep;