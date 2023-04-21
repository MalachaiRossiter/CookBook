const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(8000, () => console.log(`Listening on port: 8000`));