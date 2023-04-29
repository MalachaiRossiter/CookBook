const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
const db = require('./models');

require('dotenv').config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
require('./routes/recipe.route')(app);
require('./routes/user.routes')(app);


//connect to the database and start the server
db.sequelize.sync().then(() => {
    console.log(`Connected to the Database`);
    app.listen(8000, () => console.log(`Listening on Port: 8000`));
}).catch((err) => {
    console.log(`Failed to connect to the database`, err);
});