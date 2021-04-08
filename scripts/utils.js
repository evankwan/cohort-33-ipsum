// returns the array of possible words as an empty array
const clearPossibleWordsArray = (array) => {
  array = [];
  return array;
}

// this method needs to be modified to account for the different length options the ipsum uses. These option arrays should be in a separate file and loaded into the page prior to utils.js
const initializePossibleWordsArray = (wordsLeft, baseArray) => {
 baseArray = clearPossibleWordsArray(baseArray);
 if (wordsLeft <= 0) {
   return [];
 }
  if (wordsLeft >= 1) {
    oneWordOptions.forEach(word => {
      baseArray.push(word);
    });
  }
  if (wordsLeft >= 2) {
    twoWordOptions.forEach(word => {
      baseArray.push(word);
    });
  }
  if (wordsLeft >= 3) {
    threeWordOptions.forEach(word => {
      baseArray.push(word);
    });
  }
  if (wordsLeft >= 4) {
    fourWordOptions.forEach(word => {
      baseArray.push(word);
    });
  }
  return baseArray;
}

// returns the ipsum string with as much of the starting sequence as possible based on the words requested
const writeStartingSequence = (ipsum, startingSequence, wordsLeft) => {
  let sequence = startingSequence.split(' ');
  for (let i = 0; i < wordsLeft; i++) {
    if (sequence[i]) {
      ipsum = ipsum.concat(' ', sequence[i]);
    } else {
      break;
    }
  }
  ipsum = ipsum.concat('.').trim();
  return ipsum;
}

// returns the number of words left after subtracting the number of words used from the starting sequence
const determineWordsLeft = (ipsum, wordsLeft) => {
  return wordsLeft - ipsum.split(' ').length;
}

// returns a randomly generated index for an array
const generateIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

// generates a random number and adds punctuation to the end of the ipsum if the condition is passed. Returns the updated array
const addPeriod = (ipsum, frequency) => {
  const punctuation = [
    ".",
    "!",
    "?",
    ","
  ];
  let roll = Math.floor(Math.random() * frequency);
  if (roll === 0) {
    let index = Math.floor(Math.random() * punctuation.length);
    ipsum = ipsum.concat(punctuation[index]);
  }
  return ipsum;
}

// 
const getWordsFromArray = (wordsRequested, ipsum, startingSequence, possibleWordsArray, sentenceLength) => {
  // initialize the counter
  let wordsLeft = wordsRequested;

  // set the starting sequence
  ipsum = writeStartingSequence(ipsum, startingSequence, wordsLeft);

  // calculate words left after starting sequence
  wordsLeft = determineWordsLeft(ipsum, wordsLeft);

  while (wordsLeft > 0) {
    // determine what words are still viable to be used
    possibleWordsArray = initializePossibleWordsArray(wordsLeft, possibleWordsArray);

    // calculate the index of the word/phrase that we will use
    let word = possibleWordsArray[generateIndex(possibleWordsArray)];

    // add the chosen option onto the ipsum
    ipsum = ipsum.concat(' ', word);

    // determine if we add a period
    ipsum = addPeriod(ipsum, sentenceLength);

    // adjust the counter
    wordsLeft = wordsLeft - (word.split(' ').length);
  }
  if (ipsum.lastIndexOf('.') !== ipsum.length - 1) {
    ipsum = ipsum.concat('.');
  }
  return ipsum;
}