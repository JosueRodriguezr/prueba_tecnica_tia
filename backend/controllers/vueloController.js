const { request, response } = require('express');
const vueloModel = require('../models/vueloModel');

exports.buscarVuelos = async (req = request, res = response, next) => {
    try{
        const { origen, destino, fecha } = req.query;
        vuelos = await vueloModel.find({ origen, destino, fecha});
        console.log(vuelos);
        res.status(200).json(vuelos);
    }catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
      }
    
};

exports.buscarVueloById = async (req = request, res = response, next) => {
    try{
        const { id } = req.params;
        vuelos = await vueloModel.findById( id );
        console.log(vuelos);
        res.status(200).json(vuelos);
    }catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
      }
    
};