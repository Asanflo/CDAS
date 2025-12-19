import { useState } from "react";
import { StepperContext } from "../context/stepperContext";

import Stepper from "./stepper";
import StepperControl from "./stepper_control";

import PersonalInfosStep from "./steps/personalInfosStep";
import PaymentStep from "./steps/paymentStep";
import RequestTypeStep from "./steps/requestTypeStep";
import UploadStep from "./steps/uploadStep";
import FinalStep from "./steps/final";

import { initialiserProcedure } from "../services/procedureService"; 

import { X } from "lucide-react";


const FormProcedure = ( {closeModal} ) => {
    const [currentStep, setCurrentStep] = useState (1);
    const [userData, setUserData] = useState({
        procedure: {
            type: '',
            motif_procedure: '',
        },
        etudiant: {
            matricule: '',
            nom: '',
            prenom: '',
            filiere: '',
            ecole: '',
            moyenne_generale: '',
        },
        paiement: {
            telephone_paiement: '',
            montant: '',
        },
        documents: []
    });
    const [finalData, setFinalData] = useState([]);

    const Steps = [
        "Type de requetes",
        "Informations personnelles",
        "Téleversement de vos documents",
        "Vérification du payement",
        "dernière vérification et confirmation"
    ];

    const DisplayStep = (step) => {
        switch (step) {
            case 1:
                return <RequestTypeStep/>
            
            case 2:
                return <PersonalInfosStep/>
            
            case 3:
                return <UploadStep/>
            
            case 4:
                return <PaymentStep/>
            
            case 5:
                return <FinalStep/>
        
            default:
                break;
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;

        if (direction === "Suivant") {
            newStep++;
        } else {
            newStep--;
        }

        if (newStep >= 1 && newStep <= Steps.length) {
            setCurrentStep(newStep);
        }
    };


    const handleSubmit = async () => {
       
        try {
            await initialiserProcedure(userData);

            alert("Votre requête a été soumise, Nous vous ferons signe de la progression de votre dossier ulterieurement. ")
            
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'envoi de la procédure :", error.response?.data || error.message);
        }
    };


    return (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-xl animate-fadeIn relative">

                {/* Bouton fermer */}
                <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
                >
                <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-2">Nouvelle Procédure</h2>

                {/* stepper */}
                <div className="mt-4 mb-6 px-4 ">
                    <Stepper
                        steps = {Steps}
                        currentStep = {currentStep}
                        
                    />
                </div>

                {/* Formulaire step by step */}
                <div className="my-4 p-6">
                    <StepperContext.Provider value={{
                        userData,
                        setUserData,
                        finalData,
                        setFinalData
                    }}>
                        {DisplayStep(currentStep)}
                    </StepperContext.Provider>
                </div>

                {/* controle de navigation */}
                <div className="mt-2 px-2">
                    <StepperControl
                        handleClick = {handleClick}
                        handleSubmit = {handleSubmit}
                        currentStep = {currentStep}
                        steps ={Steps}
                    />
                </div>

            </div>
        </div>
    );
}

export default FormProcedure;