const router = require("express").Router();

const Person = require("../models/Person");

// CREATE - criação de dados
router.post('/', async (req, res) => {
    
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

// READ - leitura de daodos
router.get('/', async (req, res) => {

    try {
        const people = await Person.find();
        res.status(200).json(people);// o status http 200 significa Requisição bem Sucedida
        
    } catch (e) {
        res.status(500).json({ // o status http 500 significa Erro Interno no Servidor
            error: e
        });
    }

});

module.exports = router;