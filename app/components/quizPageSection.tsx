"use client";
import React, { useState, useEffect, useRef } from "react";
import { color, motion } from "framer-motion";
import QuizCard from "./quizCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { playerContext } from "../context/playerContext";
import StarIcon from "./StarIcon";
import { useProgress } from "../context/progressContext";
import LeaderboardSidebar from './LeaderboardSidebar';

type quizeType = {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
};

export default function QuizPageSection({ Quizes, levelNumber, levelTitle, player }: any) {
  const { refreshProgress } = useProgress();
  const [starsEarned, setStarsEarned] = useState(0);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const len = Quizes.length;
  const router = useRouter();
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [ansCorrect, setAnsCorrect] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [retried, setRetried] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeBonus, setTimeBonus] = useState(0);
  const [allAnsweredOnTime, setAllAnsweredOnTime] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeThreshold = 10 * 12;  //80% of full quiz time.
  var quizer: quizeType = Quizes[questionNumber];

  useEffect(() => {
    if (questionNumber < len && !answerChecked) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questionNumber, answerChecked]);
 
  useEffect(()=>{
    if(questionNumber >= len){
      //calculating stars:
      const timeStar = totalTimeUsed <= timeThreshold ? 1: 0;
      const accuracyStar = incorrectAnswers === 0 ? 1: 0;
      const bonusStar = timeStar && accuracyStar ? 1 : 0;
      setStarsEarned(1+ timeStar + accuracyStar + bonusStar);
    }
  }, [questionNumber, totalTimeUsed, incorrectAnswers, timeThreshold, len]);

  const handleTimeOut = () => {
    setAllAnsweredOnTime(false);
    setAnswerChecked(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const setDefault = () => {
    setSelectedAnswer(-1);
    setAnswerChecked(false);
    setAnsCorrect(false);
    setUsedHint(false);
    setRetried(false);
    setTimeLeft(15);
  };

  const calculateStars = () => {
    const timeStar = totalTimeUsed <= timeThreshold ? 1 : 0;
    const accuracyStar = incorrectAnswers === 0 ? 1 : 0;
    const bonusStar = timeStar && accuracyStar ? 1 : 0;
    return 1 + timeStar + accuracyStar + bonusStar;
  };

  const handleScore = () => {
    setAnswerChecked(true);
   
    if (timerRef.current) clearInterval(timerRef.current);
    const timeUsed = 15 - timeLeft;
    setTotalTimeUsed(prev => prev + timeUsed);
    
    if (selectedAnswer === quizer.test_answer) {
      const timeMultiplier = timeLeft / 15;
      const baseScore = retried ? 10 : 30;
      const timedScore = Math.round(baseScore * (0.5 + timeMultiplier * 0.5));
      
      setScore(score + timedScore);
      
      if (timeLeft > 5) {
        setTimeBonus(prev => prev + 10);
      }
    } else {
      setAllAnsweredOnTime(false);
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextLevel = async () => {
    const stars = calculateStars();
    const totalQuestions = Quizes.length;
    const correctAnswers = totalQuestions - incorrectAnswers;
    setStarsEarned(stars);
    const quizScore = score + timeBonus + (allAnsweredOnTime ? 50 : 0);
    
    if( !player.Playerpoint ) { 
      router.push("/")
    } else { 
      const nextLevel = Number(levelNumber) + 1
      const playerId = player?.Player_ID
      const newlevel = Math.max(player.Level_Id, nextLevel)
     
      try {
        const response = await fetch("/api/update-score", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
             playerId, 
             finalScore: quizScore + (player?.Playerpoint || 0), 
             newlevel, 
             starsEarned: stars,
             levelId: levelNumber,
             correctAnswers
           }), 
        });
  
        if (response.ok) {
          const data = await response.json();
        
          // ✅ Delay a bit before rerendering leaderboard to ensure DB is up-to-date
          setTimeout(() => {
            refreshProgress();
            router.push(`/quiz/${newlevel}`);
          }, 300); // 300ms buffer
        }
         else {
          const errorData = await response.json();
          console.error("Update failed", errorData.message);
        }
      } catch (error) {
        console.error("An error occurred score update.", error);
      }
    }
  };

  const handleShareScore = (platform: string) => {
    const playerName = player?.Player_name || "Anonymous";
    const shareUrl = `https://guhuza.com/quiz/${levelNumber}`;
    const leaderboardRank = player?.rank || "N/A";
    
    const templates = {
      facebook: {
        message: `🏆 ${playerName} just scored ${score} points on Level ${levelNumber} of Guhuza's Brain Boost!`,
        hashtag: "#BrainBoostChallenge"
      },
      twitter: {
        message: `🚀 Just scored ${score} pts on Level ${levelNumber} of @GuhuzaGames! Can you beat me?`,
        hashtags: "BrainBoost,QuizChallenge"
      },
      whatsapp: {
        message: `🧠 *Guhuza Brain Boost Update*:\n\n${playerName} here!\n\n🏅 Score: ${score} points\n📈 Level: ${levelNumber}\n🏆 Rank: ${leaderboardRank}\n\nChallenge me: `
      },
      linkedin: {
        title: `Achieved ${score} points on Guhuza Brain Boost`,
        summary: `Just completed Level ${levelNumber} with a score of ${score} points. Current leaderboard rank: ${leaderboardRank}. Join the challenge!`
      }
    };

    const encodedUrl = encodeURIComponent(shareUrl);
    let shareLink = "";

    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(templates.facebook.message + " " + templates.facebook.hashtag)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(templates.twitter.message)}&hashtags=${templates.twitter.hashtags}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(templates.whatsapp.message + shareUrl)}`;
        break;
        case 'linkedin': {
          const customMessage = `${playerName} scored ${score} pts on Level ${levelNumber} in Guhuza! 🧠 Think you can beat me? Try it here:`;
          const encodedMessage = encodeURIComponent(customMessage);
          shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://guhuza.com/share?msg=${encodedMessage}`)}`;
          break;
        }
        
    }

    window.open(shareLink, '_blank', 'noopener,noreferrer');
  };

  const handleNextQuestion = () => {
    if (questionNumber < len) {
      setQuestionNumber(questionNumber + 1);
      setDefault();
    }
  };

  const handleRetry =() => { 
    setScore(0);
    setTimeBonus(0);
    setAllAnsweredOnTime(true);
    setQuestionNumber(0);
    setDefault();
  }

  return questionNumber < len ? ( 
    <div className="md:py-16 pt-8 pb-28">
      <div className="container flex justify-between flex-wrap">
        <h2 className="md:mb-16 mb-4 title intersect: motion-preset-slide-up motion-delay-200 intersect-once">
          Level {levelNumber}: {levelTitle}
        </h2>
        <div className="flex items-center gap-4">
          <p className="mb-6">
            Question: {questionNumber + 1}/{len}
          </p>
          <div className="timer-container">
            <div className="timer-circle">
              <span
                className={`timer-text ${
                  timeLeft < 5 ? 'text-red' : timeLeft < 10 ? 'text-yellow' : ''
                }`}
              >
                Time Remaining {timeLeft}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container ml-52">
        <div className="flex justify-start md:gap-20">
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
                              setTimeLeft(15);
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
          
          <div className=" hidden md:block flex-1/2 w-100">
            {answerChecked ? (
              <div className="w-full ">
                {!ansCorrect ?  (
                  <Image
                    src="/mascot/sadMascot.svg"
                    className="motion-preset-slide-left-md motion-preset-fade"
                    alt="Guhuza Mascot"
                    height={100}
                    width={200}
                  />
                ) : (
                  <Image
                    src="/mascot/greetingMascot.svg"
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
                src="/mascot/ProudMascot.svg"
                alt="Guhuza Mascot"
                height={100}
                width={200}
              />
            )}
          </div>
          
          <div className="hidden md:block w-80 ml-6">
            {player?.Player_ID && (
              <LeaderboardSidebar playerId={player.Player_ID} currentQuizScore={score} />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="md:py-16 py-8">
      <div className="star-rating mt-6 w-full bg-purple-50 rounded-lg border-2 border-purple-200 p-6">
        <h3 className="text-xl font-bold mb-3 text-center text-purple-800">
          Level Performance
        </h3>
        <div className="flex justify-center">
          {[1, 2, 3, 4].map((star, index) => (
            <motion.div 
              key={star}
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.2 
              }}
            >
              <StarIcon 
                filled={star <= starsEarned} 
                className="w-12 h-12 mx-1 transition-all duration-300" 
                aria-label={star <= starsEarned ? `Earned star ${star}` : `Missing star ${star}`}
              />
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-center text-purple-600 font-medium">
          Earned {starsEarned}/4 stars
          {starsEarned === 4 && " - Perfect run! 🎉"}
        </p>
        
        <div className="mt-3 text-sm text-center text-gray-500">
          <p>
            Time: {totalTimeUsed.toFixed(1)}s  • 
            Incorrect Answer: {incorrectAnswers}
          </p>
        </div>
      </div>
      
      <div className="container">
        <div className="flex flex-col items-center">
          <h1 className="title text-center">Lesson Complete !</h1>
          <div className="flex flex-wrap-reverse justify-center gap-8 items-center">
            <div className="flex flex-col gap-8 mt-6 justify-center">
              {(timeBonus > 0 || allAnsweredOnTime) && (
                <div className="bonus-box bg-green-50 p-6 rounded-lg text-center">
                  <h3 className="text-2xl font-bold mb-4">🎉 Time Bonuses!</h3>
                  {timeBonus > 0 && <p className="text-lg">Speed Bonus: +{timeBonus} points</p>}
                  {allAnsweredOnTime && (
                    <p className="text-lg mt-2">Perfect Timing Bonus: +50 points</p>
                  )}
                </div>
              )}
              <div className="bg-yellow-50 rounded border-2 border-yellow-300 gap-4 flex flex-col items-center px-6 py-4">
                <p className="mt-4 text-xl"> ⭐PTS GAINED</p>
                <h1 className="text-6xl font-bold">{score}</h1>
              </div>
              <div className="bg-blue-50 rounded border-2 border-blue-100 flex flex-col gap-4 items-center px-6 py-4">
                <p className="mt-4 text-xl"> 🏆TOTAL SCORE</p>
                <h1 className="text-6xl font-bold">
                  {player?.Playerpoint 
                    ? player.Playerpoint + score + timeBonus + (allAnsweredOnTime ? 50 : 0)
                    : score + timeBonus + (allAnsweredOnTime ? 50 : 0)}
                </h1>
              </div>
            </div>
            <Image src={"/mascot/ProudMascot.svg"} className="mt-8" width={250} alt="Guhuza Bird" height={30} />
          </div>
          
          <button className="quizPbtn mt-20" onClick={handleNextLevel}>Save Score</button>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <button className="flex gap-4" onClick={handleRetry}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Retry Same Lesson
            </button>
            
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => handleShareScore('facebook')}
                className="social-btn hover:scale-110 transition-transform"
                aria-label="Share on Facebook"
              >
                <Image 
                  src="/Images/socials/FB.jpeg" 
                  width={40}
                  height={40}
                  alt="Facebook share"
                  className="social-img rounded-lg"
                />
              </button>
              
              <button 
                onClick={() => handleShareScore('twitter')}
                className="social-btn hover:scale-110 transition-transform"
                aria-label="Share on X"
              >
                <Image 
                  src="/Images/socials/X.webp" 
                  width={40}
                  height={40}
                  alt="X share"
                  className="social-img rounded-lg"
                />
              </button>

              <button 
                onClick={() => handleShareScore('whatsapp')}
                className="social-btn hover:scale-110 transition-transform"
                aria-label="Share on WhatsApp"
              >
                <Image 
                  src="/Images/socials/Whatsapp.jpeg" 
                  width={40}
                  height={40}
                  alt="WhatsApp share"
                  className="social-img rounded-lg"
                />
              </button>

              <button 
                onClick={() => handleShareScore('linkedin')}
                className="social-btn hover:scale-110 transition-transform"
                aria-label="Share on LinkedIn"
              >
                <Image 
                  src="/Images/socials/Ln.jpg" 
                  width={40}
                  height={40}
                  alt="LinkedIn share"
                  className="social-img rounded-lg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}