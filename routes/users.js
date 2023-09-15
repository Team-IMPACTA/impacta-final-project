var express = require('express');
var router = express.Router();
const UserController = require("./../controllers/UserControllers");
const UserRequest = require("./../controllers/Request/UserRequest");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dados-pessoais', function(req, res, next) {
  res.render('dados_pessoais');
});

router.get('/meus-eventos', function(req, res, next) {
  res.render('meus_eventos');
});

/** 
 * Todo: Register new user
 */
router.get('/cadastro', UserController.create);
router.post('/cadastro', UserRequest.registerValidator(), UserController.save);

module.exports = router;
