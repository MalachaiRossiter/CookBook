const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {Recipe} = require('./models');

app.post("/insert", (req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        res.json(recipe);
    })
    .catch((err) => {console.log(err)})
})


//connect to the database and start the server
db.sequelize.sync().then(() => {
    console.log(`Connected to the Database`);
    app.listen(8000, () => console.log(`Listening on Port: 8000`));
}).catch((err) => {
    console.log(`Failed to connect to the database`, err);
})