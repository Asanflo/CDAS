import { useState } from "react";
import { StepperContext } from "../context/stepperContext";

import Stepper from "./stepper";
import StepperControl from "./stepper_control";

import PersonalInfosStep from "./steps/personalInfosStep";
import PaymentStep from "./steps/paymentStep";
import RequestTypeStep from "./steps/requestTypeStep";
import UploadStep from "./steps/uploadStep";
import PaymentProofStep from "./steps/paymentVerif";
import FinalStep from "./steps/final";

import { X } from "lucide-react";


const FormProcedure = ( {closeModal} ) => {
    const [currentStep, setCurrentStep] = useState (1);
    const [userData, setUserData] = useState ('');
    const [finalData, setFinalData] = useState([]);

    const Steps = [
        "Type de requetes",
        "Informations personnelles",
        "Téleversement de vos documents",
        "Vérification du payement",
        "validation du payement",
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
                return <PaymentProofStep/>
            
            case 6:
                return <FinalStep/>
        
            default:
                break;
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "Suivant" ? newStep++ : newStep-- ;

        newStep >0 && newStep <= Steps.length && setCurrentStep(newStep);
    }


    return (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-xl animate-fadeIn relative">

                {/* Bouton fermer */}
                <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                >
                <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Nouvelle Procédure</h2>

                {/* stepper */}
                <div className="mt-6 mb-10 px-4 ">
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
                <div className="mt-6 px-4">
                    <StepperControl
                        handleClick = {handleClick}
                        currentStep = {currentStep}
                        steps ={Steps}
                    />
                </div>

            </div>
        </div>
    );
}

export default FormProcedure;