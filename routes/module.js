const express = require('express');
const router = express.Router();

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
  
    if (token) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
    }
  };

router.get('/linuxLearningLab', isAuthenticated, (req, res) => {
    res.render('linuxModule');
});

router.get('/networkingLab', isAuthenticated, (req, res) => {
    res.render('networkingModule');
});


module.exports = router;