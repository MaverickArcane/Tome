const express = require('express');
const router = express.Router();

// Render logout page
router.get('/', (req, res) => {
  res.render('logout');
});

module.exports = router;