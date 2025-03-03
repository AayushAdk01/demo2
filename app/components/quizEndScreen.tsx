import React from 'react'
import Image from 'next/image'
import Router from 'next/router';



function QuizEndScreen({score, playerPoint, setQuestionNumber, setDefault, setScore}) {
    const handleNextQuestion = () => {
        if (questionNumber < len) {
          setQuestionNumber(questionNumber + 1);
          setDefault();
        }
      };
    
    const handleRetry =() => { 
          setScore(0)
          setQuestionNumber(0)
          router.push("/quiz/"+ levelNumber)
          console.log("retried")
      
        }
  return (
    <div><div className="md:py-16 py-8">
    <div className="container">
      <div className="flex  flex-col items-center">
        <h1 className="title text-center">Lesson Complete !</h1>
        <div className="flex gap-8 items-center">
        <div className="flex flex-col gap-8 mt-6 justify-center">
          <div className="bg-yellow-50 rounded border-2 border-yellow-300 gap-4 flex flex-col items-center px-6 py-4">
           
            <p className="mt-4 text-xl"> ⭐PTS GAINED</p>
            <h1 className="text-6xl font-bold">{score}</h1>
          </div>
          <div className="bg-blue-50 rounded border-2 border-blue-100   flex flex-col gap-4 items-center px-6 py-4">
          
            <p className="mt-4 text-xl"> 🏆TOTAL SCORE</p>
            <h1 className="text-6xl font-bold">{playerPoint +  score}</h1>
          </div>
        </div>
        <Image src={"/mascot/proudMascot.svg"} className="mt-8" width={250} alt="Guhuza Bird" height={30} />

        </div>
        



        <div>

        </div>
        <button className="quizPbtn mt-20" onClick={handleNextLevel}>Continue to Next Level</button>

        <div className="flex gap-6 mt-8">
          <button className="flex  gap-4" onClick={handleRetry}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Retry Same Lesson</button>
          <button className="flex gap-4">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
            Share Score on social Media</button>
        </div>

      </div>
      <div>
      
        <LeaderBoard Players={players}  />
      </div>
    </div>
  </div></div>
  )
}

export default QuizEndScreen