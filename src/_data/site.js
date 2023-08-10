// Some useful variables to expose to our site templsates
// ORJIN         "trello_board": process.env.TRELLO_BOARD_URL || 'https://trello.com/b/Zzc0USwZ/hellotrello'
require('dotenv').config();

module.exports = {
  "utm": "?utm_source=github&utm_medium=hellotrello-pnh&utm_campaign=devex",
  "host": new URL(process.env.URL || "https://localhost").host,
  "trello_board": process.env.TRELLO_BOARD_URL || 'https://trello.com/b/OuvsGoU3/hellotrelloturq'
  
};
