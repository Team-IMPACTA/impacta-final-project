var express = require('express');
const EventController = require('../controllers/EventController');
var router = express.Router();
const path = require('path');
const {check, validationResult, body} = require('express-validator');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/create', EventController.showCreateEventForm);
router.post('/create', upload.single("link_imagem"), [
  check('nome').isLength({min:3}).withMessage('O nome do evento deve ter mais de 3 caracteres.'),
  check('tema').isLength({min:3}).withMessage('O tema deve ter mais de 3 caracteres'),
  check('descricao').isLength({min:6}).withMessage('A descrição precisa ter no mínimo 6 caracteres'),
  check('data_inicio').isLength({min:8}).withMessage("Preencha a data de início"),
  check('data_fim').isLength({min:8}).withMessage("Preencha a data do fim"),
  check('hora_inicio').trim().isInt({ allow_leading_zeroes: true }).withMessage('A hora de início deve ser um número.'),
  check('hora_fim').trim().isInt({ allow_leading_zeroes: true }).withMessage('A hora do fim deve ser um número.'),
  check('preco').trim().isInt({ allow_leading_zeroes: true }).withMessage('O preço deve ser um número.'),
  check('inicio_vendas').isLength({min:8}).withMessage("Preencha a data do início das vendas"),
  check('link_video').isLength({min: 10}).withMessage("Insira um link de um vídeo do YouTube"),
    check('link_imagem').custom((value, {req})=> {
      if (!req.file) throw new Error("É preciso carregar um arquivo de imagem como banner do seu evento");
      return true;
    })
  
] ,EventController.createEvent);
router.get('/edit/:id', EventController.editEvent);
router.post('/edit/:id', [
  check('nome').isLength({min:3}).withMessage('O nome do evento deve ter mais de 3 caracteres.'),
    check('tema').isLength({min:3}).withMessage('O tema deve ter mais de 3 caracteres'),
    check('descricao').isLength({min:6}).withMessage('A descrição precisa ter no mínimo 6 caracteres'),
    check('data_inicio').isLength({min:8}).withMessage("Preencha a data de início"),
    check('data_fim').isLength({min:8}).withMessage("Preencha a data do fim"),
    check('hora_inicio').trim().isInt({ allow_leading_zeroes: true }).withMessage('A hora de início deve ser um número.'),
    check('hora_fim').trim().isInt({ allow_leading_zeroes: true }).withMessage('A hora do fim deve ser um número.'),
    check('preco').trim().isInt({ allow_leading_zeroes: true }).withMessage('O preço deve ser um número.'),
    check('inicio_vendas').isLength({min:8}).withMessage("Preencha a data do início das vendas"),
] , EventController.updateEvent);
router.get('/list', EventController.listEvent);
router.post('/delete/:id', EventController.deleteEvent);
router.get('/search', EventController.showSearchBar);
router.get('/searchResult', [
  check('key').isLength({min: 2}).withMessage('Sua pesquisar precisa ter pelo menos 2 letras.')
] ,EventController.searchResult)

router.get('/event/:id', EventController.showEvent);

router.get('/subscribe/:id', EventController.subscribe);

router.get('/acess/:id', EventController.acessEvent)

router.get('/meus-eventos', function(req, res, next) {
  res.render('meus_eventos');
});

router.get('/trilha', function(req, res, next){
  res.render('trilha')
});



module.exports = router;
