// initial config
const express = require('express');
const app = express();

// way to read JSON / using middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// intial root / endpoint

app.get('/' , (req, res) => {

    //show req

    res.json({
        message: "OI Express!",
    })

});

// give a port
app.listen(3000);