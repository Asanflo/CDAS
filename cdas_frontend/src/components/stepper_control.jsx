const StepperControl = ({ handleClick, handleSubmit, currentStep, steps }) => {

  const isLastStep = currentStep === steps.length;

  return (
    <div className="container flex justify-around mt-4 mb-8">

      {/* Bouton précédent */}
      <button
        onClick={() => handleClick("Retour")}
        disabled={currentStep === 1}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold
          cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white
          transition duration-200 ease-in-out
          ${currentStep === 1 ? "opacity-50 cursor-not-allowed hover:bg-white hover:text-slate-400" : ""}
        `}
      >
        Revenir en arrière
      </button>

      {/* Bouton suivant / valider */}
      <button
        onClick={() => {
          if (isLastStep) {
            handleSubmit();
          } else {
            handleClick("Suivant");
          }
        }}
        className="bg-indigo-600 text-white uppercase py-2 px-4 rounded-xl font-semibold
          cursor-pointer hover:bg-indigo-700 transition duration-200 ease-in-out"
      >
        {isLastStep ? "Valider" : "Suivant"}
      </button>

    </div>
  );
};

export default StepperControl;
