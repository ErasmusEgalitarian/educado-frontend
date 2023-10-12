import { type Answer } from './Answer'

export interface Exercise {
  id: string
  sectionId: string
  title: string
  description: string
  exerciseNumber: number
  content: any
  onWrongFeedback: any
  answers: Answer[]
}
