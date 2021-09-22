const express = require('express');
const router = express.Router();

// temporary objects
const items = [
    {name:'Item 1', description:'', price:10},
    {name:'Item 2', description:'', price:20},
    {name:'Item 3', description:'', price:15},
    {name:'Item 4', description:'', price:50},
    {name:'Item 5', description:'', price:35},
    {name:'Item 6', description:'', price:100}
  ]

// default
router.get('/', (req, res, next) => {
    const user = req.user;
    if (user == null){
        res.redirect('/');
        return;
    }
    
    const data = {
        user: user,
        items: items
      }
    res.render('account', data);
});

  // logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;