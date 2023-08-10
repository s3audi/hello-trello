const fetch = require('node-fetch');

// Get any environment variables we need
// With public fallbacks for happier onboarding  
// Orjin              TRELLO_BOARD_URL='https://trello.com/b/Zzc0USwZ/hellotrello',
// Orjin              TRELLO_LIST_ID='5e98325d6d6bd120f2b7395f',
// Orjin              TRELLO_BOARD_URL='https://trello.com/b/Zzc0USwZ/hellotrello',
require('dotenv').config();
const {
  TRELLO_BOARD_URL='https://trello.com/b/OuvsGoU3/hellotrelloturq',
  TRELLO_LIST_ID='64d4b276420088129b6ac6d3',
  BRANCH } = process.env;


module.exports = () => {

  // Fetch the JSON data about this board
  return fetch(TRELLO_BOARD_URL + '.json')
    .then(res => res.json())
    .then(json => {

      // Just focus on the cards which are in the list we want
      // and do not have a closed status
      let contentCards = json.cards.filter(card => {
        return card.idList == TRELLO_LIST_ID && !card.closed;
      });

      // only include cards labelled with "live" or with
      // the name of the branch we are in
      let contextCards = contentCards.filter(card => {
        return card.labels.filter(label => (
          label.name.toLowerCase() == 'live' ||
          label.name.toLowerCase() == BRANCH
        )).length;
      });

      // If a card has an attachment, add it as an image in the descriotion markdown
      contextCards.forEach(card => {
        if(card.attachments.length) {
          card.name = "";
          card.desc = card.desc + `\n![${card.name}](${card.attachments[0].url} '${card.name}')`;
        }
      })

      // return our data
      return contextCards;
  });
};
