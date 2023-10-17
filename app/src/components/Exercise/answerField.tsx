
import { useForm, SubmitHandler } from "react-hook-form";
import { Answer } from "../../interfaces/Answer";
import { bool, boolean } from "yup";

// find a better aleternative to onChange

type Inputs = {
    index: number;
    answerObject: Answer;
    callback: Function;
};



export const AnswerField = ({index, answerObject, callback}:Inputs) => {
    return(
        <div className="flex items-center gap-8 w-full mt-8 items-baseline">
            
            {/** Correct answer button */}
            <div className="form-control w-1/5">
                <label className="label">
                    <span className="label-text">Right answer</span>
                </label>    
                    <input type="checkbox" className="" defaultChecked={answerObject.isCorrect} onChange={()=>{answerObject.setIsCorrect(!answerObject.isCorrect); callback(index, answerObject)}}/> 
            </div>

            {/** Answer text field */}
            <div className="form-control w-2/5">
                <label className="label">
                    <span className="label-text">Answer</span>
                </label>
                <textarea
                    className="input input-bordered w-full h-16"   
                    placeholder="Add a possible answer to your exercise"
                    onChange={(e) => {answerObject.setText(e.target.value); callback(index, answerObject)}}
                />  
            </div>

            {/** Feedback input field*/}
            <div className="form-control w-2/5">
                <label className="label">
                    <span className="label-text">Feedback</span>
                </label>
                <textarea
                    className="input input-bordered w-full h-16"
                    placeholder="Add feedback to your exercise"
                    onChange={(e) => {
                            answerObject.setFeedback(e.target.value); 
                            callback(index, answerObject);
                        }}    
                />
            </div>

        </div>
    );
}