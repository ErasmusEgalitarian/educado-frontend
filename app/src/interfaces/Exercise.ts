import {Answer} from "./Answer";

export interface Exercise {
    _id: string,
    parentSection: string,
    title: string,
    question: string,
    answers: Answer[]
}