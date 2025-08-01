interface QuizQuestion {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
}

interface QuizTestGroup {
  test_group: number;
  next_test_group: number;
  question: QuizQuestion[];
}

interface QuizApiResponse {
  test: QuizTestGroup;
}
/*
export const fetchQuiz = async (level: string): Promise<QuizApiResponse> => {
  const res = await fetch(`https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`);
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
};

const fetchQuestion = async() => { 
  const quresponse = await fetch("https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=8")
  const questions = quresponse.json()
}
*/

export const fetchQuiz = async (level: string): Promise<QuizApiResponse> => {
  try {
    const res = await fetch(`https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`);
    if (!res.ok) throw new Error(`Quiz API failed with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Quiz fetch error:", error);
    return { 
      test: {
        test_group: 0,
        next_test_group: 0,
        question: [] 
      } 
    };
  }
};
