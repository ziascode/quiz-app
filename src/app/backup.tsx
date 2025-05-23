"use client"; // Ensures this is a client component (Next.js App Router)

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router


// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

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
      "question": "What 2 things does a person lose if he/she misses Asr salah intentionally?",
      "options": [
        "Friends",
        "Family",
        "Property",
        "Time"
      ],
      "correct": ["Family", "Property"]
    },
    {
      "question": "What is Az-Zaqqum?",
      "options": [
        "Food for the people of hellfire",
        "Drink for the people of hellfire",
        "Home for the people of hellfire",
        "Clothes for the people of hellfire"
      ],
      "correct": "Food for the people of hellfire"
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
      "question": "Which 2 surahs are for seeking protection in Allah from evil-eye & witchcraft?",
      "options": [
        "Surah Yaseen",
        "Surah Falaq",
        "Surah Ikhlas",
        "Surah Naas"
      ],
      "correct": ["Surah Falaq", "Surah Naas"]
    },
    {
      "question": "Which of the following is not an example of Major Shirk?",
      "options": [
        "Asking help from a Prophet",
        "Going to a pious person’s grave for blessings",
        "Denying Allah & His religion",
        "Showing off"
      ],
      "correct": "Showing off"
    },
    {
      "question": "What does Allah’s name Al-Mu’izz mean?",
      "options": [
        "The One who dishonours",
        "The One who will judge",
        "The One who honours",
        "The One who sees it all"
      ],
      "correct": "The One who honours"
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
      "question": "Which Surah is referred as the oft-repeating verses Surah?",
      "options": [
        "Surah Ikhlas",
        "Surah Fatihah",
        "Surah Naas",
        "Surah Rahman"
      ],
      "correct": "Surah Fatihah"
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
      "question": "How did Abu Hurairah (RA) stop forgetting and had an amazing memory?",
      "options": [
        "He drank Zam Zam water",
        "The Prophet (ﷺ) made dua for him",
        "He wrote everything down",
        "He revised constantly"
      ],
      "correct": "The Prophet (ﷺ) made dua for him"
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
      "question": "Why does Allah allow suffering to happen?",
      "options": [
        "To punish the disbelievers",
        "To test the believers",
        "To remind people of His power",
        "All of the above"
      ],
      "correct": "All of the above"
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
    setMounted(true);

    

    // Select 5 random questions & shuffle their options
    const selected = shuffleArray(questions).slice(0, 5).map((q) => ({
      ...q,
      options: shuffleArray(q.options), // Shuffle options for each question
    }));

    setSelectedQuestions(selected);
  }, []);

  if (!mounted || selectedQuestions.length === 0) return <p>Loading...</p>;

  const handleAnswer = (option) => {
    if (Array.isArray(selectedQuestions[currentQuestion].correct)) {
      if (selectedQuestions[currentQuestion].correct.includes(option)) {
        setScore(score + 1);
      }
    } else {
      if (option === selectedQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }

    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
      setTimeout(() => {
        router.push("/iframe"); // ✅ Redirect to iframe after showing score
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a192f] to-[#1c3a63] p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="shooting-stars-container">
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold text-blue-100 py-6">Ramadan Trivia</h1>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center text-white">
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
                    className="block w-full bg-yellow-500 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
