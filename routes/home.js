const express = require('express');
const router = express.Router();

// default
router.get('/', (req, res, next) => {
    res.render('home', null)
  })

module.exports = router;