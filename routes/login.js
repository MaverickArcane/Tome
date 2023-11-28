const express = require('express');
const router = express.Router();

// Render login page
router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;