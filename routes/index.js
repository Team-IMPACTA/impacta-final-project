const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/quem-somos', function(req, res, next){
  res.render('quem-somos')
});

router.get('/area-usuario', function(req, res, next){
  res.render('area-usuario')
});

router.get('/plenaria', function(req, res, next){
  res.render('plenaria')
});

router.get('/home-do-evento', function(req, res, next){
  res.render('home_do_evento')
});

router.get('/dados-pessoais', function(req, res, next) {
  res.render('dados_pessoais');
});

router.get('/seguranca', function(req, res, next){
  res.render('seguranca')
});

module.exports = router;
