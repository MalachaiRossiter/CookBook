const express = require('express');
const router = express.Router();
const { Recipe } = require('./models');

router.post("/insert", (req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        res.json(recipe);
    })
    .catch((err) => { console.log(err) })
});

module.exports = router;