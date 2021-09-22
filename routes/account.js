const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const User = require('../models/User')


// default
router.get('/', (req, res, next) => {
    const user = req.user;
    if (user == null){
        res.redirect('/');
        return;
    }
    
    Item.find(null, (err, items) => {
        if (err)
            return next(err);

        Item.find({interested: user._id}, (err, interestedItems) => {
            const data = {
                user: user,
                items: items,
                interested: interestedItems
            };
            res.render('account', data);
        });
    });
});

  // logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/additem/:itemid', (req, res, next) => {
    const user = req.user;
    if (user == null){
        res.redirect('/');
        return;
    }

    Item.findById(req.params.itemid, (err, item) => {
        if (err){
            return next(err);
        }
        
        if (item.interested.indexOf(user._id) == -1){
            item.interested.push(user._id);
            item.save();
            res.redirect('/account')
        }
    });
});

router.post('/resetpassword', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err)
            return next(err);
        res.json({
            confirmation: 'success',
            data: 'reset password endpoint',
            user: user
        });
    });
});

module.exports = router;