const express = require('express');
const router = express.Router();
const Mailgun = require('mailgun-js');

const Item = require('../models/Item');
const User = require('../models/User');

const randomString = (length) => {
    let text = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i=0; i<length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


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

        user.nonce = randomString(8);
        user.passwordResetTime = new Date();
        user.save();

        const mailgun = Mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        });

        console.log(mailgun);

        const data = {
            to: req.body.email,
            from: process.env.EMAIL,
            sender: 'Sample Store',
            subject: 'Password Reset Request',
            html: 'Please click <a style="color:red" href="http://localhost:5000/account/password-reset?nonce='+user.nonce+'&id='+user._id+'">HERE</a> to reset your password. This link is valid for 24 hours.'

        };

        mailgun.messages().send(data, (err, body) => {
            if (err)
                return next(err);
            // success:
	        console.log(data);
            res.json({
                confirmation: 'success',
                data: 'reset password endpoint',
                user: user
            });
        });
    });
});

module.exports = router;