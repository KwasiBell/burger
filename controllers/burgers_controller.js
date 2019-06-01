const express = require("express");
const router = express.Router();
const orm = require('../config/orm');

router.get("/", function (req, res) {
  orm.selectAllBy('is_favorite', false, function (error, burgers) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    }
    res.render("index", { burgers, style: 'index' });
  });

});

router.get('/all', (req, res) => {

  orm.selectAll(function (error, burgers) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    }
    console.log("/all burgers");
    console.log(burgers);
    res.render("./layouts/allBurgers", { burgers, style: 'all', title: 'View all burgers' });
  });
});

router.get('/favorites', (req, res) => {
  orm.selectAllBy("is_favorite", true, function (error, burgers) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    }
    console.log("burgers");
    console.log(burgers);
    res.render("./layouts/favorites", { burgers, style: 'all', title: 'View favorite burgers' });
  });
});



router.post('/add', (req, res) => {
  const burgerName = req.body.burger_name;

  orm.insertOne(burgerName, function (error, burger) {
    if (error) {
      return res.status(401).json({
        message: 'Cannot add Burger'
      });
    }
    return res.json({
      burger_name: burgerName,
      id: burger.instertId,
      is_favorite: 0
    });


  });


});

router.delete('/delete/:id', () => {
  const id = req.params.id;

  orm.deleteOne(id, function (err, burger) {
    if (err) {
      return res.status(501).json({
        message: 'Not able to delete burger'
      });
    }
    return res.json({
      id
    });

  });



});

router.put('/:id/:value', (req, res) => {
  const id = req.params.id;
  const condition = JSON.parse(req.params.value);

  orm.updateOne(condition, id, function (error, burger) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to add burger to your favorite'
      });
    }

    return res.json({
      id: id
    });

  });


});
module.exports = router;
