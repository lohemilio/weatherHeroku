const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const weather = require('./weather.js')

app.get('/',function(req,res){
    res.send({
        Bienvenido: 'WEATHER CONDITIONS APP'
    })
})


app.get('/weather',function(req,res){
    if ( !req.query.search){
        res.send({
            error: 'Debes enviar el nombre de una ciudad'
        })     
    }
    weather.getCoordinates(req.query.search, function(error,latitude,longitude){
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            weather.getWeatherConditions(latitude, longitude, function(error, response){
                if(error){
                    return res.send({
                        error: error
                    })
                }
                else{
                    return res.send({
                        response: req.query.search + ': ' + response
                    })
                }
                
              })
        }
    })
    
})

app.get('*',function(req,res){
    res.send({
        error: 'Ruta no válida!'
    })
})


app.listen(port,function(){
    console.log('Up and running')
})

