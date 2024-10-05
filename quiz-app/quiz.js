const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Quiz questions
const questions = [
  { question: "What is the capital of France? ", answer: "Paris" },
  { question: "What is 2 + 2? ", answer: "4" },
  { question: "What is the capital of Nepal? ", answer: "Kathmandu" },
  { question: "What is the largest planet in our solar system? ", answer: "Jupiter" },
  { question: "Who wrote 'Hamlet'? ", answer: "Shakespeare" },
  { question: "What is the chemical symbol for water? ", answer: "H2O" },
  { question: "What is the hardest natural substance on Earth? ", answer: "Diamond" },
  { question: "What is the main language spoken in Brazil? ", answer: "Portuguese" },
  { question: "What is the smallest country in the world? ", answer: "Vatican City" },
  { question: "What is the capital of Japan? ", answer: "Tokyo" },
  { question: "What is 5 * 6? ", answer: "30" },
  { question: "What planet is known as the Red Planet? ", answer: "Mars" },
  { question: "Who painted the Mona Lisa? ", answer: "Leonardo da Vinci" },
  { question: "What is the largest ocean on Earth? ", answer: "Pacific Ocean" },
  { question: "What is the currency of the United States? ", answer: "Dollar" },
  { question: "What is the boiling point of water? ", answer: "100" },
  { question: "What is the longest river in the world? ", answer: "Nile" },
  { question: "What is the main ingredient in guacamole? ", answer: "Avocado" },
  { question: "Who discovered penicillin? ", answer: "Alexander Fleming" },
  { question: "What is the capital of Canada? ", answer: "Ottawa" },
  { question: "Which planet is closest to the Sun? ", answer: "Mercury" },
  { question: "What is the largest mammal in the world? ", answer: "Blue Whale" },
  { question: "What is the chemical formula for table salt? ", answer: "NaCl" },
  { question: "Who was the first man on the moon? ", answer: "Neil Armstrong" },
  { question: "What gas do plants absorb from the atmosphere? ", answer: "Carbon dioxide" },
  { question: "What is the tallest mountain in the world? ", answer: "Mount Everest" },
  { question: "Who wrote 'Pride and Prejudice'? ", answer: "Jane Austen" },
  { question: "What is the primary color of bananas? ", answer: "Yellow" },
  { question: "What is the name of the fairy in Peter Pan? ", answer: "Tinkerbell" },
  { question: "What is the capital of Australia? ", answer: "Canberra" },
  { question: "How many continents are there? ", answer: "7" },
  { question: "What is the freezing point of water? ", answer: "0" },
  { question: "What is the speed of light? ", answer: "299792458" },
  { question: "What is the largest desert in the world? ", answer: "Sahara" },
  { question: "Who is known as the 'Father of Computers'? ", answer: "Charles Babbage" },
  { question: "What is the most spoken language in the world? ", answer: "Mandarin" },
  { question: "What is the capital of Italy? ", answer: "Rome" },
  { question: "What is the square root of 81? ", answer: "9" },
  { question: "What is the currency of the UK? ", answer: "Pound" },
  { question: "What is the chemical symbol for gold? ", answer: "Au" },
  { question: "What is the primary gas in the Earth's atmosphere? ", answer: "Nitrogen" },
  { question: "What is the capital of Germany? ", answer: "Berlin" },
  { question: "Who invented the telephone? ", answer: "Alexander Graham Bell" },
  { question: "What is the main ingredient in bread? ", answer: "Flour" },
  { question: "What is the powerhouse of the cell? ", answer: "Mitochondria" },
  { question: "What is the smallest planet in our solar system? ", answer: "Mercury" }
];

// Function to shuffle questions
const shuffleQuestions = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

shuffleQuestions(questions);

let score = 0;
let currentQuestion = 0;
let attemptedQuestions = 0;
let totalQuestions = 0;
let timer; // Timer variable

const askQuestion = () => {
  if (currentQuestion < totalQuestions) {
    console.log(questions[currentQuestion].question);
    timer = setTimeout(() => {
      console.log("Time's up!");
      currentQuestion++;
      askQuestion();
    }, 10000); // 10 seconds timer

    rl.question("Your answer (Type 'exit' to quit): ", (userAnswer) => {
      clearTimeout(timer); // Clear the timer on user input
      if (userAnswer.trim().toLowerCase() === 'exit') {
        console.log(`You chose to exit the quiz. Your final score is ${score}/${totalQuestions} (Correct: ${score}, Wrong: ${totalQuestions - score})`);
        rl.close();
        return;
      }
      attemptedQuestions++;
      if (userAnswer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
        console.log("Correct!");
        score++;
      } else {
        console.log("Wrong! The correct answer is " + questions[currentQuestion].answer);
      }
      currentQuestion++;
      askQuestion();
    });
  } else {
    console.log(`Quiz over! Your total attempted questions: ${attemptedQuestions}`);
    console.log(`Your final score is ${score}/${totalQuestions} (Correct: ${score}, Wrong: ${totalQuestions - score})`);
    rl.close();
  }
};

rl.question("How many questions would you like to attempt? ", (num) => {
  totalQuestions = parseInt(num);
  if (isNaN(totalQuestions) || totalQuestions <= 0 || totalQuestions > questions.length) {
    console.log("Please enter a valid number of questions.");
    rl.close();
    return;
  }
  askQuestion();
});
