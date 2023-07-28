const router = require("express").Router();

const Person = require("../models/Person");

// CREATE - criação de dados -

router.post('/', async (req, res) => {

    // request do body    
    const {
        name,
        age,
        salary,
        aproved
    } = req.body; // Criar variaveis assim é um recurso do js, chamado Destructuring

    if (!name) {
        res.status(422).json({ //o status http 422 significa que há algum erro semântico na requisição
            error: "O nome é obrigatório!"
        });
        return;

    } else if (!age) {
        res.status(422).json({
            error: "A idade é obrigatória!"
        });
        return;

    } else if (!salary) {
        res.status(422).json({
            error: "O salário é obrigatório!"
        });
        return;

    } else if (!aproved) {
        res.status(422).json({
            error: "A aprovação é obrigatória!"
        });
        return;
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

// READ - leitura de dados -

router.get('/', async (req, res) => {

    try {
        const people = await Person.find();

        if(!people) {
            res.status(422).json({ //o status http 422 significa que há algum erro semântico na requisição
                error: "Nenhum usuário encontrado!"
            });
            return;
        }

        res.status(200).json(people); // o status http 200 significa Requisição bem Sucedida

    } catch (e) {
        res.status(500).json({ // o status http 500 significa Erro Interno no Servidor
            error: e
        });
    }

});

router.get("/:id", async (req, res) => {

    // extrair o dado da requisição, pela url --> req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({_id: id}); // pode ser tbm findById(id), a diferença é como é tratado undefined

        if(!person) {
            res.status(422).json({ //o status http 422 significa que há algum erro semântico na requisição
                error: "Usuário não encontrado."
            });
            return;
        }        
        res.status(200).json(person); // o status http 200 significa Requisição bem Sucedida

    } catch (e) {
        res.status(500).json({ // o status http 500 significa Erro Interno no Servidor
            error: e
        });
    }
});


/* 
    UPDATE - atualização de dados - PUT(pra atualizar tem que mandar o obj. por inteiro),
    PATCH(nao precisa atualizar o obj. inteiro, pode mudar apenas um parametro)
*/

router.patch("/:id", async(req, res) => {

    const id = req.params.id;

    const {
        name,
        age,
        salary,
        aproved
    } = req.body;

    const person = {
        name,
        age,
        salary,
        aproved
    };

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount == 0) {
            res.status(422).json({ //o status http 422 significa que há algum erro semântico na requisição
                error: "Usuário não encontrado."
            });
        }

        res.status(200).json(person);
        
    } catch (e) {
        res.status(500).json({ // o status http 500 significa Erro Interno no Servidor
            error: e
        });
    }

});

module.exports = router;