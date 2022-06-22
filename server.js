const express = require('express');
const app = express();
const data = require('./data.json');

// Verbos HTTP
// GET - Receber dados de um resource.
// POST - Enviar dados ou informações para serem processados por um resource.
// PUT - Atualizar os dados de um resource.
// DELETE - Deletar um resource.

app.use(express.json());

app.get('/clients', function(req, res){
    res.json(data);
});

app.get('/clients/:id', function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
    
    if ( !client ) return res.status(204).json();

    res.json(client);
});

app.post('/clients', function(req, res){
    const { name, email } = req.body;

    // Salvar novo cliente
    res.json({ name, email });
});

app.put('/clients/:id', function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    const { name, email } = req.body;

    client.name = name;
    client.email = email;

    res.json(client);
});

app.delete('/clients/:id', function(req, res){
    const { id } = req.params;
    const clientFiltered = data.filter(client => client.id != id);

    res.json(clientFiltered);
});

app.listen(3000, function() {
    console.log('Server is running!')
})
