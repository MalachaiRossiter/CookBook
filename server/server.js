const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const routes = require('./routes');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/', routes);

//connect to the database and start the server
db.sequelize.sync().then(() => {
    console.log(`Connected to the Database`);
    app.listen(8000, () => console.log(`Listening on Port: 8000`));
}).catch((err) => {
    console.log(`Failed to connect to the database`, err);
});