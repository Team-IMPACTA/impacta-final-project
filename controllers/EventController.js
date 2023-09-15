const { Events } = require('../models')
const { User } = require("./../models");
const {check, validationResult, body} = require('express-validator');
const Sequelize = require('Sequelize')
const Op = Sequelize.Op
const moment = require('moment')

module.exports = {
    showCreateEventForm: (req, res) => {
        res.render('registrar-evento')
    },
    listEvent: async(req, res) => {
        let eventList = await Events.findAll({
            order: [
                ['data_inicio', 'ASC']
            ]
        })
        
        let eventListJson = await eventList.map(result=> result.toJSON())

        let newEvents = eventListJson.map((event)=> {
            return {
                ...event, 
                data_inicio: moment(event.data_inicio).format('DD-MM-YYYY')
            }
        })
        res.render('home-do-evento', {eventList: newEvents})
    },
    createEvent: async (req, res) => {
        let {nome, tema, descricao, data_inicio, data_fim, hora_inicio, hora_fim, preco, inicio_vendas, link_video} = req.body
        if(!req.file){
            req.file = {
                originalname: 'Logo-weGether.jpg'
            }
        }
        link_imagem = req.file.originalname
        let codVideo = link_video.slice(32)
        let errorList = validationResult(req)
        if(errorList.isEmpty()){
       
        try {
           let newEvent = await Events.create({
               nome,
               tema,
               descricao,
               data_inicio,
               data_fim,
               hora_inicio,
               hora_fim,
               preco,
               inicio_vendas,
               link_imagem,
               link_video: codVideo 

           })
           res.redirect('/events/list')

       } catch(err) {
          res.send(err)
       }
    } else {
        let event = {
            nome,
            tema,
            descricao,
            data_inicio,
            data_fim,
            hora_inicio,
            hora_fim,
            preco,
            inicio_vendas,
            link_imagem,
            link_video 

        }
        res.render('registrar-evento-error', {
            errors:errorList.errors,
            event
        })
    }
      
    },
    editEvent: async(req, res)=> {
        const {id} = req.params

        let evento = await Events.findByPk(id)

        let eventJson = await evento.toJSON()

        let newEvent =  {
                ...eventJson, 
                data_inicio: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                inicio_vendas: moment(eventJson.data_inicio).format('YYYY-MM-DD')
            }

        return res.render('editar-eventos', {evento: newEvent})
    },
    updateEvent: async(req, res)=> {
        const {nome, tema, descricao, data_inicio, data_fim, hora_inicio, hora_fim, preco, inicio_vendas, link_imagem, link_video} = req.body
        const {id} = req.params
        let codVideo = link_video.slice(32)
        let errorList = validationResult(req)
        if(errorList.isEmpty()){
            try {
                const resultado = await Events.update({
                   nome,
                   tema,
                   descricao,
                   data_inicio,
                   data_fim,
                   hora_inicio,
                   hora_fim,
                   preco,
                   inicio_vendas,
                   link_imagem,
                   link_video: codVideo
                }, {
                    where: {
                       id
                    }
                })
                console.log(resultado)
                res.redirect('/events/list')
    
            }catch(error) {
               console.log(error)
            }
        } else {
            const evento = await Events.findByPk(id)
            let eventJson = await evento.toJSON()

        let newEvent =  {
                ...eventJson, 
                data_inicio: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                inicio_vendas: moment(eventJson.data_inicio).format('YYYY-MM-DD')
            }
            
            res.render('editar-eventos', {evento: newEvent,
            errors: errorList.errors})
        }
            
    },
    deleteEvent: async(req,res)=>{
        const {id} = req.params

        const resultado = await Events.destroy({
            where: {
                id
            }
        })
        res.redirect('/events/list')
    },
    showSearchBar: async(req, res)=> {
         res.render('pesquisar')
    },
    searchResult: async(req, res)=> {
        let {key} = req.query
        let errorList = validationResult(req)
        if(errorList.isEmpty()){
            try{
                let events = await Events.findAll({
                    where: {
                       nome: {
                           [Op.like]: `%${key}%`
                       }
                    }
                })
                let eventListJson = await events.map(result=> result.toJSON())

        let newEvents = eventListJson.map((event)=> {
            return {
                ...event, 
                data_inicio: moment(event.data_inicio).format('DD-MM-YYYY')
            }
        })
                res.render('resultado-pesquisar', {events: newEvents})
            }catch(error){
                res.send(error)
            }
            
        }
        else{
            res.render('pesquisar', {errors: errorList.errors})
        }
       
    },
    showEvent: async(req, res, next)=> {
        const {id} = req.params

        let evento = await Events.findByPk(id)

        let eventJson = await evento.toJSON()

        let newEvent =  {
                ...eventJson, 
                data_inicio: moment(eventJson.data_inicio).format('DD-MM-YYYY'),
                data_fim: moment(eventJson.data_inicio).format('DD-MM-YYYY')
            }

        res.render('evento', {evento: newEvent})
    },
    subscribe: async(req, res, next) => {
        const {id} = req.params

        let evento = await Events.findByPk(id)

        let eventJson = await evento.toJSON()

        let newEvent =  {
                ...eventJson, 
                data_inicio: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(eventJson.data_inicio).format('YYYY-MM-DD'),
                inicio_vendas: moment(eventJson.data_inicio).format('YYYY-MM-DD')
            }

        res.render('evento-acessar', {evento: newEvent})
    },
    acessEvent: async(req, res, next)=> {
        const {id} = req.params

        let evento = await Events.findByPk(id)

        res.render('participar-evento', {evento})
    }

}