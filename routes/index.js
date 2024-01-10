var express = require('express');
var router = express.Router();
const cron = require('node-cron');

let data = {
  morning_number: undefined,
  evening_number: undefined
};

/* GET home page. */
router.get('/', function (req, res, next) {

  function generateRandomNumbers() {
    data.morning_number = Math.floor(Math.random() * 100) + 1;
    data.evening_number = Math.floor(Math.random() * 100) + 1;

    console.log(`Random Numbers at ${new Date().toLocaleTimeString()}: ${data.morning_number}, ${data.evening_number}`);
  }

  cron.schedule('0 7 * * *', () => {
    generateRandomNumbers();
  });

  cron.schedule('25 5 * * *', () => {
    generateRandomNumbers();
  });

  console.log('Cron jobs scheduled.');

  res.render('index', {
    title: '2D FOR MA HTET',
    data: {
      morning_number: data.morning_number,
      evening_number: data.evening_number
    }
  });
});

module.exports = router;
