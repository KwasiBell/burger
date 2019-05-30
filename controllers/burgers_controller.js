const express = require("express");
const router = express.Router();

const orm = require('../config/orm');
router.get("/", function (req, res) {
 orm.selectAll(function(error, burgers) {
      if(error) {
        return res.status(501).json({
          message: 'Not able to query the database'
        });
      }

      res.render("index", { burgers, style: 'index'});
  });

});

router.get('/every', (req,res) => {

  res.render('every_burger');
});

router.get('/goats', (req,res) => {

  res.render('goats');
});



router.post('/add', (req,res) => {
  const burgerName = req.body.burger_name;

  orm.insertOne(burgerName, function(error, burger) {
    if (error) {
      return res.status(401).json({
        message: 'Cannot add Burger'
      });
    }
      return res.json({
        burger_name: burgerName
        id: burger.instertId,
        is_favorite: 0
      });


  });


});



module.exports = router;
