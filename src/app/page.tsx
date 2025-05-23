"use client";

type Question = {
  question: string;
  options: string[];
  correct: string | string[];
};

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questions = [
    
    {
      "question": "Which sahaba did Prophet Muhammad (ﷺ) help to become free from being a slave by planting 300+ date palm trees?",
      "options": [
        "Bilal ibn Rabah (ra)",
        "Thawban ibn Bujdud (ra)",
        "Zayd ibn Harisa (ra)",
        "Salman al Farisi (ra)"
      ],
      "correct": "Salman al Farisi (ra)"
    },
    {
      "question": "What is the virtue of reciting Ayatul Kursi before going to bed at night to sleep?",
      "options": [
        "Takes away hunger",
        "Gives you strength",
        "You are protected from harm till sunrise",
        "House in Jannah"
      ],
      "correct": "You are protected from harm till sunrise"
    },
    {
      "question": "Which Prophet (as) had control of the Jinn and was able to talk to animals?",
      "options": [
        "Sulaiman (as)",
        "Dawud (as)",
        "Yunus (as)",
        "Musa (as)"
      ],
      "correct": "Sulaiman (as)"
    },
    {
      "question": "What does Zam Zam mean?",
      "options": [
        "Holy water",
        "Water well",
        "Stop",
        "Drink"
      ],
      "correct": "Stop"
    },
    {
      "question": "How many times do you have to pray in a day?",
      "options": [
        "6",
        "3",
        "5",
        "10"
      ],
      "correct": ["5"]
    },
    {
      "question": "What is Sidrat al-Muntaha?",
      "options": [
        "Food for the people of Jannah",
        "An olive tree of the farthest boundary",
        "A lote tree of the farthest boundary",
        "Drink for the people of Jannah"
      ],
      "correct": "A lote tree of the farthest boundary"
    },
    {
      "question": "What was the relation between Prophet Musa (alayhi as-salaam) & Prophet Haroon (alayhi as-salaam)?",
      "options": [
        "Cousins",
        "Brothers",
        "Father & son",
        "Friends"
      ],
      "correct": "Brothers"
    },
    {
      "question": "Which is not one of the rights of a Muslim upon another Muslim?",
      "options": [
        "If one invites, you accept it",
        "If one dies, you attend the funeral",
        "If one asks for advice, you give sincerely",
        "If one asks for money, you give"
      ],
      "correct": "If one asks for money, you give"
    },
    {
      "question": "Who is the first prophet?",
      "options": [
        "Prophet Yunis",
        "Prophet Adam",
        "Prophet Ibrahim",
        "Prophet Isa"
      ],
      "correct": "Prophet Adam"
    },
    {
      "question": "Who will get their book of deeds in the right hand on the day of judgment?",
      "options": [
        "The people of Jannah",
        "The people of Jahannam",
        "The people of Araf",
        "The people of Dunya"
      ],
      "correct": "The people of Jannah"
    },
    {
      "question": "Which Angel will blow the horn to signal the Day of Judgement?",
      "options": [
        "Angel Jibreel",
        "Angel Mikail",
        "Angel Israfil",
        "Angel Malik"
      ],
      "correct": "Angel Israfil"
    },
    {
      "question": "Who was a first cousin of Prophet Muhammad (peace be upon him)?",
      "options": [
        "Abu Bakr (RA)",
        "Umar ibn Khattab (RA)",
        "Ali ibn Abi Talib (RA)",
        "Uthman ibn Affan (RA)"
      ],
      "correct": "Ali ibn Abi Talib (RA)"
    },
    {
      "question": "At what age does a person become an adult in Islam?",
      "options": [
        "18 years old",
        "10 years old",
        "Puberty",
        "15 years old"
      ],
      "correct": "Puberty"
    },
    {
      "question": "Which body part(s) shouldn’t be touching the floor during sujood?",
      "options": [
        "Forearms",
        "Knees",
        "Feet",
        "Hands"
      ],
      "correct": "Forearms"
    }
  
  
];  

  useEffect(() => {
    console.log("Mounted useEffect running...");

    if (questions.length === 0) {
      console.error("No questions found!");
      return;
    }

    const selected = shuffleArray(questions)
      .slice(0, 5)
      .map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));

    console.log("Selected questions:", selected);

    setSelectedQuestions(selected);
    setMounted(true);
  }, []);

  if (!mounted || selectedQuestions.length === 0) {
    console.log("Still loading...", { mounted, selectedQuestions });
    return <p>Loading...</p>;
  }

  const handleAnswer = (option: string)  => {
    const correctAnswer = selectedQuestions[currentQuestion].correct;
    const isCorrect = Array.isArray(correctAnswer)
      ? correctAnswer.includes(option)
      : option === correctAnswer;

    if (isCorrect) setScore(score + 1);
    setFeedback(isCorrect ? "Correct!" : "Incorrect.");

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion + 1 < selectedQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setFinished(true);
        setTimeout(() => {
          router.push("/iframe");
        }, 3000);
      }
    }, 1500);
  };

  return (
    <div className="bg-clouds-animation min-h-screen flex items-center justify-center bg-birds-animation p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold text-white py-6">Islamic Trivia</h1>
        <h2 className="mb-5 font-semibold">Complete this quiz for a chance to win a kaaba Kiwa Quran</h2>
        {/* <div className="relative bg-black/40 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center text-white"> */}
        <div className="relative bg-black/40  border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center text-white">
          {finished ? (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">Quiz Completed! 🎉</h2>
              <p className="text-lg mt-2">
                Your score: <span className="font-bold">{score}</span> out of {selectedQuestions.length}
              </p>
              <p className="text-gray-300 text-sm mt-2">Redirecting...</p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-yellow-300">
                {selectedQuestions[currentQuestion].question}
              </h2>
              <div className="mt-6 space-y-4">
                {selectedQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="block w-full bg-yellow-500 text-slate-800 text-lg font-medium py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback && (
                <p className={`mt-4 text-lg font-semibold ${feedback === "Correct!" ? "text-green-400" : "text-red-400"}`}>
                  {feedback}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
