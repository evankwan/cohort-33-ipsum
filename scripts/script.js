const app = {};
app.numberWordsRequested = 7;
app.sentenceLength = 10;
app.startingSequence = 'Juno ipsum dolor sit amet, college adipisicing elit';
app.ipsum = '';
app.possibleWords = [];

// cached selectors
app.$wordsRequestForm = $('#words-request');
app.$wordsRequestInput = $('#words-needed');
app.$ipsumContainer = $('#ipsum-container');

app.getWordsRequestedFromInput = () => {
  app.$wordsRequestForm.on('submit', event => {
    event.preventDefault();
    app.ipsum = '';
    app.numberWordsRequested = app.$wordsRequestInput.val();

    app.ipsum = getWordsFromArray(app.numberWordsRequested, app.ipsum, app.startingSequence, app.possibleWords, app.sentenceLength);

    app.displayIpsum();
  })
}

app.displayIpsum = () => {
  app.$ipsumContainer.html(`
    <p id='ipsum'>
      ${app.ipsum}
    </p>
  `);
}

app.init = () => {
  app.getWordsRequestedFromInput();
}

$.ready = () => {
  app.init();
}