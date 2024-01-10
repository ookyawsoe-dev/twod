var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const today = new Date();
    // const formattedDate = today.toISOString().split('T')[0];
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;
    const url = `https://api.thaistock2d.com/2d_result?date=${formattedDate}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    res.render('index', {
      title: 'MA HTET 2D',
      data
    });
  } catch (error) {
    console.error('Error:', error.message);

    res.status(500).render('error', {
      title: 'Error',
      message: 'An unexpected error occurred.'
    });
  }
});


module.exports = router;
