const { check } = require('express-validator')
const UserRequest = {};

UserRequest.registerValidator = () => {
    return [
        check('nome')
            .notEmpty()
            .withMessage('O nome é obrigatório'),
        check('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('E-mail invalido'),
        check('phone')
            .notEmpty()
            .withMessage('O telefone é obrigatório')
            .isMobilePhone('pt-BR')
            .withMessage('Número invalido'),
        check('senha')
            .notEmpty()
            .withMessage('A senha é obrigatória')
            .isLength({ min: 8 })
            .withMessage('senha tem que ter no mínimo 8 caracteres')
    ]
  }

UserRequest.loginValidation = () => {
    return [
        check('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('E-mail invalido'),
        check('password')
            .notEmpty()
            .withMessage('A senha é obrigatória')
            .isLength({ min: 8 })
            .withMessage('senha tem que ter no mínimo 8 caracteres')
    ]
}

module.exports = UserRequest;