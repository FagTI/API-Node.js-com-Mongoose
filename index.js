// configuracao inicial
require('dotenv').config();

const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD); // esse 'encodeURIComponent' corrige um possivel erro de unescaped caracters

// forma para ler JSON / usando middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rota inicial / endpoint

app.get('/' , (req, res) => {

    //mostrar req

    res.json({
        message: "OI Express!",
    })

});

// dar uma porta
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mbjqfcs.mongodb.net/?retryWrites=true&w=majority`,
    ).then(() => {
        app.listen(3000);
        console.log("Conectado com sucesso!");
    }).catch((e) => {
        console.log(e);
    })