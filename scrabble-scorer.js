// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");

   return input.question("Enter a word to score: ");

};


let newPointStructure = transform(oldPointStructure);

let simpleScorer = (scoringWord) => {
   scoringWord = scoringWord.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < scoringWord.length; i++) {

      letterPoints++
   }
   return letterPoints;
}

let newPointStructureTwo = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
}

let vowelBonusScorer = (scoringWord) => {
   scoringWord = scoringWord.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < scoringWord.length; i++) {
      if (newPointStructureTwo[3].includes(scoringWord[i])) {
         letterPoints += 3
      } else {
         letterPoints += 1
      }
   }
   return letterPoints;
}

let scrabbleScorer = (scoringWord) => {

   scoringWord = scoringWord.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < scoringWord.length; i++) {
      for (let letter in newPointStructure){

         if (letter === scoringWord[i]) {
            letterPoints += newPointStructure[letter]
            break;
         }
      }
   }
   return letterPoints;
}

const scoringAlgorithms = [{
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let optionOfAlgorithim = input.question('Which scoring algorithm would you like to use? \n 0 - Simple: One point per character. \n 1 - Vowel Bonus: Vowels are worth 3 points. \n 2 - Scrabble: Uses scrabble point system. \n Enter 0, 1, or 2: ');
   if (optionOfAlgorithim === '0') {
      return scoringAlgorithms[0]
   }
   if (optionOfAlgorithim === '1') {
      return scoringAlgorithms[1]
   }
   if (optionOfAlgorithim === '2') {
      return scoringAlgorithms[2]
   }
}

function transform(pointStructure) {
   let pointStruc = {}
   for (let item in pointStructure) {
      for (let i = 0; i < pointStructure[item].length; i++) {
         let lowercaseLetter = pointStructure[item][i].toLowerCase()

      pointStruc[lowercaseLetter] = Number(item)
   }
}
   return pointStruc;
};

function runProgram() {
   let word = initialPrompt(); 
   let chosenAlgorithm = scorerPrompt();
   console.log(`Score for '${word}' is : ${chosenAlgorithm.scorerFunction(word)}`)
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};