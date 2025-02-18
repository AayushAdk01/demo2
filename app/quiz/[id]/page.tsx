import Qbtn from "@/app/components/buttons/quizbtn";
import { fetchQuiz } from "@/utils/fQuiz";
import QuizCard from "@/app/components/quizCard";
import QuizPageSection from "@/app/components/quizPageSection";
import fetchLevels from "@/utils/fLevels";

type quizeType = {
  question: string;
  comment: string;
  test_answer: number;

  answers: string[];
};
type quizesType = {
  question: quizeType[];
};

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const data = await fetchQuiz(params.id);
    const Quizes = data.test.question;
    const levels = (await fetchLevels()|| [])
    const levelNumber = params.id
    const levelTitle = levels?.[Number(levelNumber)-1].Level_Title
    
    return (
      <div>
        
        <QuizPageSection Quizes={Quizes} levelNumber = {levelNumber}  levelTitle = {levelTitle} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <p>Error Loading Quiz</p>;
  }
}
