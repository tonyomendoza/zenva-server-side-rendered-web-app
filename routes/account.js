const express = require('express');
const router = express.Router();

// temporary objects
const Item = require('../models/Item');

// default
router.get('/', (req, res, next) => {
    const user = req.user;
    if (user == null){
        res.redirect('/');
        return;
    }
    
    Item.find(null, (err, items) => {
        if (err)
            return next(err)
        const data = {
            user: user,
            items: items
        }
        res.render('account', data)
    })
});

  // logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;