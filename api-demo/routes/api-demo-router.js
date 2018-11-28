
// External Packages
const Joi = require('joi'); // Data validation package
const debugApp = require('debug')('api-demo:app'); // Debug package. Application workspace
const express = require('express');

// Inititalize variables
const router = express.Router();


// Database initialization 
var produtos = [
    {id:1, name:'carro'}, 
    {id:2, name:'moto'},
];
// ----------- Database initialized ---------



// Function to return product found at the database based on the request
// Return : Product found
// Otherwise returs : Undefined (defauls answer find array method)
const findProduct = function (id) {
    return produtos.find(p=> parseInt(p.id) === parseInt(id));
};


// Data schema validation for the input request.
// Return : String with the error message using Joi package.
// Ortherwise returns : Undefined
const errorRequest = function (req) {

    const msg =`Validating request data input:
    ${JSON.stringify(req.body)}`;
    debugApp(msg);
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        debugApp(`Error validating request data. Error: ${result.error.message}`);
        return result.error.message;
    }
    else return undefined;

};



// API Get Method (Express package) 
// Return a product based on parameter id
// Otherwise returs http 404 with error message
router.get('/:id', (req, res)=> {

    // Business validation if products exist
    const achouProduto = findProduct(req);
    if (!achouProduto) res.status(404).send("Não achou o produto id : "+ req.params.id);
    else res.send(achouProduto);
});


// GET router : Return the list of products
router.get('/', (req,res)=> {

    debugApp('Get : Router.');

    let resultProdutos = '';
    produtos.forEach(element => { resultProdutos += '<br>' + element.id + '-' + element.name  
    });
    res.send(`Lista de cursos: ${resultProdutos}`);
    debugApp(resultProdutos);
});

// POST router : Add a product to the database
router.post('/', (req, res) => {

    debugApp('Post: Router.');

    // Validate data input. Receives Joi Error message
    const errorMsg = errorRequest(req);
    if (errorMsg) return res.status(400).send(errorMsg); // Returs HTTP 400 - Bad request

    // Business validations. None.

    // Database. Add new data.
    debugApp('Post: adding product to db');
    const produto = {
        id: produtos.length + 1,
        name : req.body.name
    }
    produtos.push(produto);
    debugApp('Post: return product to requester');
    return res.send(produto);
    
});


// PUT router : Update a product to the database
router.put('/:id', (req, res) => {

    debugApp('Put: Router. Update id '+ req.params.id);

     // Validate data input. Receives Joi Error message
     const errorMsg = errorRequest(req);
     if (errorMsg) return res.status(400).send(errorMsg); // Returs HTTP 400 - Bad request
  
    // Business validations
    const achouProduto = findProduct(req.params.id);
    if (!achouProduto) return res.status(404).send("Product doesn´t exist. Id:"+ req.params.id);
    
    // Database. Update data.
    achouProduto.name = req.body.name; 
    debugApp('Put: return product updated');
    return res.send(achouProduto);

});


// DELETE router : Delete a product from the database
router.delete('/:id', (req,res)=> {

    debugApp('Delete: Router. Delete id '+ req.params.id );

    // Data validation. Not required

    // Business validations
    // Product must exist to be deleted.
    const achouProduto = findProduct(req.params.id);
    if (!achouProduto) return res.status(404).send("Product doesn´t exist. Id:"+ req.params.id); // HTTP 404 - Not found

    debugApp('Product : ' + JSON.stringify(achouProduto));
    // Database. delete data.
    const index = produtos.indexOf(achouProduto);
    produtos.splice(index,1);

    debugApp('Delete: return product deleted to requester');
    return res.send(achouProduto);

});

module.exports = router;