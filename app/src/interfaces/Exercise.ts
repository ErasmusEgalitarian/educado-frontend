import { type Answer } from './Answer'

export interface Exercise {
    _id: string,
    sectionId: string,
    title: string,
    question: string,
    exerciseNumber: number,
    content: any,
    onWrongFeedback: any,
    answers: Answer[]
}
