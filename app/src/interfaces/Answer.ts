export class Answer {
    text: string = "";
    feedback: string = "";
    isCorrect: boolean = false; 
    
    constructor(){};

   
    /**
     * 
     * @param text - The text to set the answer to
     */
    public setText(text: string) {
        this.text = text;
    }

    /**
     * 
     * @param feedback - The feedback to set the answer to
     */
    public setFeedback(feedback: string) {
        this.feedback = feedback;
    }

    /**
     * 
     * @param isCorrect - The boolean to set the answer to
     */
    public setIsCorrect(isCorrect: boolean) {
        this.isCorrect = isCorrect;
    }

    /**
     * Function to copy values from another answer
     * @param answer - The answer to copy from
     * @returns void
     */
    public copy(answer:Answer){
        this.text = answer.text;
        this.feedback = answer.feedback;
        this.isCorrect = answer.isCorrect;
    }
}

