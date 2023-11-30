const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/', (req, res) => {
  res.render('login');
});
module.exports = router;
