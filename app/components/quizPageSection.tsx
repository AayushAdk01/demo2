"use client";
import React, { use, useState } from "react";
import QuizCard from "./quizCard";
import { div } from "framer-motion/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LeaderBoard from "./leaderBoard";
import { useContext } from "react";
import { playerContext } from "../context/playerContext";
type quizeType = {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
};


export default function QuizPageSection({ Quizes, levelNumber, levelTitle}: any) {


  const {AssignPlayerData, setPlayerLevel, player} = useContext(playerContext)
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

  const handleNextLevel = async () =>  {
    const newlevel =Number(levelNumber) +1
    const finalScore = score + player.Playerpoint
    const playerId = player.Player_ID


    try {
      const response = await fetch("/api/updateScore", { 
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerId,finalScore,newlevel  }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log("User updated in successfully!", data);
          AssignPlayerData(data.player);
          setPlayerLevel(data.player.Level_Id)
          router.push(`/quiz/${newlevel}` )
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

  return questionNumber < len ? (
    <div className="md:py-16 py-8">
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
        <div className="quizPoints">
          <h1 className="title">Lesson Complete !</h1>
          <p>PTS GAINED</p>
          <h1>+{score}</h1>
          <p>Total Score = {55 + score} </p>
          <button> Retry Same Lesson</button>
          <button> Share Score on social Media</button>
          <button className="quizPbtn" onClick={handleNextLevel}>Continue to Next Level</button>
        </div>
        <div>
          {/* <h1 className="title">LeaderBoard</h1>
          <p>Check our top performer</p> */}
          <LeaderBoard player={1} friends={[2, 4, 9]} />
        </div>
      </div>
    </div>
  );
}
