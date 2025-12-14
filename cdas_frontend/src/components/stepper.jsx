import React, {useState, useEffect, useRef} from "react";

const Stepper = ({steps, currentStep}) => {
    const [newstep, setNewStep] = useState ([]);
    const stepRef = useRef();

    const UpdateStep = (stepNumber, steps) => {
        const newSteps = [... steps];
        let count =0;

        while (count < newSteps.length) {
            // current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count ++;
            }
            // step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count ++;
            }
            // step pending
            else{
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count ++;
            }
        }

        return newSteps;
    };

    useEffect  (() => {
        // create an object
        const stepState = steps.map((step, index) =>
            Object.assign(
                {},
                {
                    description: step,
                    completed: false,
                    highlighted: index === 0 ? true : false,
                    selected: index === 0 ? true : false,
                })
        );

        stepRef.current = stepState;
        const current = UpdateStep(currentStep -1, stepRef.current);
        setNewStep(current);

    }, [steps, currentStep]);

    const displaySteps = newstep.map((step, index) => {
       return (
         <div key={index}
             className={
                index !== newstep.length -1 ?
             "w-full flex items-center " : "flex items-center"}>
            <div className="relative flex flex-col items-center text-amber-600">
                <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 
                    h-12 w-12 flex items-center justify-center py-3 
                    ${step.selected ? "bg-indigo-700 text-white font-bold border border-indigo-600" : ""}`}>
                    {/* numero ecran */}
                        {step.completed ? (
                            <span className="text-white  font-bold text-xl ">&#10003;</span>
                        ) : (
                            index +1
                        )}
                </div>
                <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase 
                    ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}>
                    {/* description ecran */}
                        {step.description}
                </div>
            </div>
            <div className={`flex-auto border-t-2 text-gray-300 transition duration-500 ease-in-out
                  ${step.completed ? "border-indigo-700" : "border-gray-300"}`}>
                {/* ligne ecran */}
            </div>
        </div>
       );
    });

    return(
        <div className="mx-4 p-4 flex justify-between items-center">
            { displaySteps }
        </div>
    );
}

export default Stepper;