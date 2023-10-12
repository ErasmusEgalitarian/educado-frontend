import { useState } from 'react'
import { type Answer } from '../../interfaces/Answer'

function AnswerCards ({ update: updateAnswers, initialAnswers }: { update: any, initialAnswers: Answer[] }) {
  const [answers, setAnswers] = useState(initialAnswers)

  const toggler = (index: number) => {
    const updatedAnswerCards = answers.map((answer, idx) => {
      if (idx === index) {
        answer.correct = !answer.correct
      }
      return answer
    })

    setAnswers(updatedAnswerCards)
    updateAnswers(updatedAnswerCards)
  }

  const handleAnswerCardAdd = () => {
    const withAddedAnswer = [...answers, { text: '', correct: false }]

    setAnswers(withAddedAnswer)
    updateAnswers(withAddedAnswer)
  }

  const handleAnswerCardDelete = (index: any) => {
    try {
      if (index < 2) {
        throw Error('Deletion not allowed. An exercise needs at least 2 answers')
      }

      const withOneLessAnswer = [...answers]
      withOneLessAnswer.splice(index, 1)
      setAnswers(withOneLessAnswer)
      updateAnswers(withOneLessAnswer)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAnswerCardChange = (e: any, index: number) => {
    const { value } = e.target

    const list = [...answers]
    list[index].text = value

    setAnswers(list)

    updateAnswers(list)
  }
  return (
        <div className="flex justify-center py-2">
            <div className="flex justify-space-around ">
                <div className="grid grid-cols-2 gap-5">
                    {answers.map((answer, index) => (
                        <div key={index} className="card w-64 h-64 bg-base-100 border hover:shadow-xl">
                            <div className="card-body">

                                <div className="card-actions flex justify-around ">

                                    <button onClick={() => { handleAnswerCardDelete(index) }} className="btn btn-square btn-sm absolute top-2 right-2  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                        </svg>
                                    </button>
                                </div>

                                <textarea className="textarea textarea-success disabled:bg-white disabled:border-white h-full resize-none"
                                    placeholder="Some answer text"
                                    required={true}
                                    name="answer"
                                    id="answer"
                                    defaultValue={answer.text || ''}
                                    onChange={(e) => { handleAnswerCardChange(e, index) }}
                                >
                                </textarea>

                                <div className="grid justify-items-center">
                                    {/* Toggle True or False  */}
                                    <input type="checkbox" className="toggle" checked={answer.correct} onChange={() => { toggler(index) }} />
                                    {answer.correct ? <span>Correct</span> : <span>Incorrect</span>}
                                </div>

                            </div>
                        </div>
                    ))}

                    {answers.length < 4 &&
                        <div key={-1} onClick={handleAnswerCardAdd} className="card w-64 h-64 bg-none border border-dashed border-4 hover:shadow-xl">
                            <div className="card-body">
                                <div className="card-actions flex justify-around items-center h-full">
                                    <div className="flex flex-row space-x-4" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add Answer
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
  )
}

export default AnswerCards
