var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const filtered_date = req.query.date;
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = filtered_date ? filtered_date : `${year}-${month}-${day}`;

    const url = `https://api.thaistock2d.com/2d_result?date=${formattedDate}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    res.render('index', {
      title: 'MA HTET 2D',
      query: req.query,
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
