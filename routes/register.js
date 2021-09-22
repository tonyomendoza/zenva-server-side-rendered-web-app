const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('localRegister', {
    successRedirect: '/account'
}));

// router.post('/', (req, res, next) => {
//     User.create(req.body, (err, user) => {
//         if (err){
//             return next(err) //We receive an actual error here
//         }
//         res.json({
//             confirmation: 'success',
//             user: user
//     });
//   });
// });

module.exports = router;