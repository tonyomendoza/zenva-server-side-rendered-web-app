const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('localLogin', {
  successRedirect: '/account'
}))

// router.post('/', (req, res, next) => {
//     const email = req.body.email;

//     User.findOne({email: email}, (err, user) => {
//         if (err){
//           return next(err)
//         }
//         // user not found:
//         if (user == null)
//           return next(new Error('User Not Found'));
          
//         // check password:
//         if (user.password != req.body.password){
//           return next(new Error('Incorrect Password'));
//         }

//         res.json({
//           confirmation:'success',
//           user: user
//         });
//       });
// })

module.exports = router;