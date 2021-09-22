const express = require('express');
const router = express.Router();

// default
router.get('/', (req, res, next) => {
  
  res.json({
    user: req.user || 'not logged in'
  });
});

// logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({
        confirmaton: 'user logged out'
    });
});

module.exports = router;