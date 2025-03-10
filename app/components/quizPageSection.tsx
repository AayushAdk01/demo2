"use client";
import React, { use, useState } from "react";
import QuizCard from "./quizCard";
import { div } from "framer-motion/client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import LeaderBoard from "./leaderBoard";
import { useContext } from "react";
import { playerContext } from "../context/playerContext";
type quizeType = {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
};
import fetchPlayers from "@/utils/fPlayers";

export default function QuizPageSection({ Quizes, levelNumber, levelTitle, player }: any) {


  const { AssignPlayerData, setPlayerLevel, setTempScore } = useContext(playerContext)
  const len = Quizes.length;
  const router = useRouter()
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [ansCorrect, setAnsCorrect] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [retried, setRetried] = useState(false);
  var quizer: quizeType = Quizes[questionNumber];

  const setDefault = () => {
    setSelectedAnswer(-1);
    setAnswerChecked(false);
    setAnsCorrect(false);
    setUsedHint(false);
    setRetried(false);
  };

  const handleNextLevel = async () => {
    if( !player) { 
      setTempScore(score)
      router.push("/signup")
    } else { 
      const nextLevel = Number(levelNumber) + 1
      const finalScore = score + player?.Playerpoint
      const playerId = player?.Player_ID
      const newlevel = Math.max(player.Level_Id, nextLevel)
     
      try {
        const response = await fetch("/api/updateScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerId, finalScore, newlevel }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("User updated in successfully!", data);
          AssignPlayerData(data.player);
          setPlayerLevel(data.player.Level_Id)
          router.push(`/quiz/${newlevel}`)
          console.log(data.newlevel)
          console.log(player)
  
  
  
        } else {
          const errorData = await response.json();
          console.error("Login failed:", errorData.message);
  
  
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
  
  
      }
    }
    
  }


  const handleScore = () => {
    setAnswerChecked(true);

    if (selectedAnswer == quizer.test_answer) {
      if (retried) {
        setScore(score + 10);
      } else {
        setScore(score + 30);
      }
    }
   
  };

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

  return questionNumber < len ? (
    <div className="md:py-16 pt-8 pb-28">
      <div className="container flex  justify-between flex-wrap">
        <h2 className=" md:mb-16 mb-4 title intersect: motion-preset-slide-up motion-delay-200 intersect-once">
          Level { levelNumber} : {levelTitle} 
        </h2>
        <p className="mb-6">
          Question : {questionNumber + 1}/{len}
        </p>
      </div>
      <div className="container">
        <div className=" flex  justify-start md:gap-20  ">
          {
            <div className="flex-1">
              <QuizCard
                Question={quizer.question}
                CorrectAns={quizer.test_answer}
                Answers={quizer.answers}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                checked={answerChecked}
                setAnsCorrect={setAnsCorrect}
              />

              {/* buton section */}
              <div className=" ">
                <div className="mt-10 ">
                  {answerChecked ? (
                    <div className="w-full ">
                      {!ansCorrect ? (
                        <div>
                          <div className="flex gap-10">
                            <button
                              className="quizPbtn"
                              onClick={() => {
                                setSelectedAnswer(-1);
                                setAnswerChecked(false);
                                setRetried(true);
                              }}
                              disabled={usedHint}
                            >
                              Retry
                            </button>
                            <button
                              className="quizSbtn"
                              onClick={() => {
                                setSelectedAnswer(quizer.test_answer);
                                setUsedHint(true);
                              }}
                            >
                              Display Answer
                            </button>
                          </div>
                          <p className="mt-6 text-sm absolute">
                            You can use Display Answer to force move to next
                            question without any point
                          </p>
                        </div>
                      ) : (
                        <div className="flex">
                          <button
                            className="quizPbtn ml-auto "
                            onClick={() => handleNextQuestion()}
                          >
                            {questionNumber < len - 1
                              ? "Next Question"
                              : "Finish Quiz"}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className="quizPbtn"
                      onClick={() => handleScore()}
                      disabled={selectedAnswer == -1 ? true : false}
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              </div>
            </div>
          }
          <div className=" hidden md:block flex-1/2 w-100">
            {answerChecked ? (
              <div className="w-full ">
                {!ansCorrect ? (
                  <Image
                    src="/mascot/sadMascot.svg"
                    className="motion-preset-slide-left-md motion-preset-fade"
                    alt="Guhuza Mascot"
                    height={100}
                    width={200}
                  />
                ) : (
                  <Image
                    src="/mascot/proudMascot.svg"
                    className="motion-preset-slide-left-md motion-preset-fade"
                    alt="Guhuza Mascot"
                    height={100}
                    width={200}
                  />
                )}
              </div>
            ) : (
              <Image
                className="motion-preset-slide-up-md motion-preset-fade"
                src="/mascot/greetingMascot.svg"
                alt="Guhuza Mascot"
                height={100}
                width={200}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
 
    <div className="md:py-16 py-8">
      <div className="container">
        <div className="flex  flex-col items-center">
          <h1 className="title text-center">Lesson Complete !</h1>
          <div className="flex flex-wrap-reverse justify-center gap-8 items-center">
          <div className="flex  flex-col gap-8 mt-6 justify-center">
            <div className="bg-yellow-50 rounded border-2 border-yellow-300 gap-4 flex flex-col items-center px-6 py-4">
             
              <p className="mt-4 text-xl"> ⭐PTS GAINED</p>
              <h1 className="text-6xl font-bold">{score}</h1>
            </div>
            <div className="bg-blue-50 rounded border-2 border-blue-100   flex flex-col gap-4 items-center px-6 py-4">
            
              <p className="mt-4 text-xl"> 🏆TOTAL SCORE</p>
              <h1 className="text-6xl font-bold">{player?.Playerpoint ? player?.Playerpoint +  score: score}</h1>
            </div>
          </div>
          <Image src={"/mascot/proudMascot.svg"} className="mt-8" width={250} alt="Guhuza Bird" height={30} />

          </div>
          



         
          <button className="quizPbtn mt-20" onClick={handleNextLevel}>Continue to Next Level</button>

          <div className="flex  flex-wrap justify-center gap-6 mt-8">
            <button className="flex  gap-4" onClick={handleRetry}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Retry Same Lesson</button>
            <button className="flex gap-4">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
              Share Score on social Media</button>
          </div>

        </div>
       
      </div>
    </div>
  );
}
