// configuracao inicial
require('dotenv').config();

const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD); // esse 'encodeURIComponent' corrige um possivel erro de unescaped caracters

const Person = require("./models/Person");

// forma para ler JSON / usando middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas da API

app.post("/person", async (req, res) => {
    
    // request do body    
    const {name, age, salary, aproved} = req.body; // Criar variaveis assim é um recurso do js, chamado Destructuring

    if(!name) {
        res.status(422).json({error: "O nome é obrigatório!"});
    } else if (!age) {
        res.status(422).json({error: "A idade é obrigatória!"});
    }

    const person = {
        name,
        age,
        salary,
        aproved
    };

    // metodo 'create' do mongoose
    try {
        //criando dados
        await Person.create(person);

        res.status(201).json({ // o status http 201 significa que algum recurso foi criado com sucesso no servidor
            message: "Pessoa inserida no sistema com sucesso!"
        }); 

    } catch (e) {
        res.status(500).json({ // o status http 500 significa Erro Interno no Servidor
            error: e
        }); 
    }
});

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
        console.log("Conectado com sucesso ao MongoDB!");
    }).catch((e) => {
        console.log(e);
    });