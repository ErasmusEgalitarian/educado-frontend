// Importing the 'useState' hook from React
import { useState } from "react";
import { useEducationErrors, useExperienceErrors } from "../helpers/formStates";

//Validation for month and day input
export default ()=>{

  //import education & experience date errors states
  const {educationErrors, setEducationErrors, educationErrorState, setEducationErrorState } = useEducationErrors();
  const {experienceErrors, setExperienceErrors, experienceErrorState, setExperienceErrorState} = useExperienceErrors();

      // validating date format & creating integer limits on the date format
      const dateValidation = (value: any) => {
        let month =
          parseInt(value.substring(0, 2)) >= 1 &&
          parseInt(value.substring(0, 2)) <= 12;
        const regex = new RegExp("/", "g");
        let matchResult = value.match(regex);
        let count = matchResult ? matchResult.length : 0;
        return (
          !value.includes("/") ||
          count > 1 ||
          !value.substring(0, 3).includes("/") ||
          value.length != 5 ||
          !month ||
          value.substring(3, 5) == 0
        );
      };

      // Handling validation based on form type (education/experience)
    const handleValidation = (index: any, name: any, value: any, forForm :any) => {
      // Set education error state and update error messages based on the input field
        if(forForm == 'education'){
          if (dateValidation(value)) {
            if (name === "startDate") {
              setEducationErrorState(true);
              setEducationErrors((prevState) => {
                let newState = [...prevState];
                newState[index].startDate = "Invalid Format";
                return newState;
              });
            } else if (name === "endDate") {
              setEducationErrorState(true);
              setEducationErrors((prevState) => {
                let newState = [...prevState];
                newState[index].endDate = "Invalid Format";
                return newState;
              });
            }
          } else {
            // Reset education error state and clear error messages based on the input field
            setEducationErrorState(false);
            if (name === "startDate") {
              setEducationErrors((prevState) => {
                let newState = [...prevState];
                newState[index].startDate = "";
                return newState;
              });
            } else if (name === "endDate") {
              setEducationErrors((prevState) => {
                let newState = [...prevState];
                newState[index].endDate = "";
                return newState;
              });
            }
          }
        }else{
          // Set experience error state and update error messages based on the input field
          if (dateValidation(value)) {
            if (name === "startDate") {
              setExperienceErrorState(true);
              setExperienceErrors((prevState) => {
                let newState = [...prevState];
                newState[index].startDate = "Invalid Format";
                return newState;
              });
            } else if (name === "endDate") {
              setExperienceErrorState(true);
              setExperienceErrors((prevState) => {
                let newState = [...prevState];
                newState[index].endDate = "Invalid Format";
                return newState;
              });
            }
          } else {
            // Reset experience error state and clear error messages based on the input field
            setExperienceErrorState(false);
            if (name === "startDate") {
              setExperienceErrors((prevState) => {
                let newState = [...prevState];
                newState[index].startDate = "";
                return newState;
              });
            } else if (name === "endDate") {
              setExperienceErrors((prevState) => {
                let newState = [...prevState];
                newState[index].endDate = "";
                return newState;
              });
            }
          }
        }
      };
       // Returning states and validation function
    return {
        handleValidation,
        experienceErrors, setExperienceErrors,
        educationErrorState, setEducationErrorState,
        educationErrors, setEducationErrors,
        experienceErrorState, setExperienceErrorState
    }
}