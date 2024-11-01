const { request, response } = require('express');
const reservaModel = require('../models/reservaModel');
const vueloModel = require('../models/vueloModel');

exports.crearReserva = async (req = request, res = response, next) => {
    const { vueloId, usuarioId } = req.body;
    try{
        const reserva = new reservaModel({ 
            vueloId, 
            usuarioId 
        });
        await vueloModel.findByIdAndUpdate(vueloId, { disponibilidad: false });
        console.log(reserva);
        await reserva.save();
        res.status(200).json({
            msg: 'Reserva creada'
        });
    }catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
  }
};

exports.cancelarReserva = async (req = request, res = response, next) => {
    try{
        const { id } = req.params;
        const reserva = await reservaModel.findByIdAndUpdate(id, { estado: 'cancelado' });
        const vueloId = reserva.vueloId;
        if (vueloId) {
            await vueloModel.findByIdAndUpdate(vueloId, { disponibilidad: true });
        }
        res.status(200).json({
            msg: 'Reserva cancelada'
        });
    }catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
  }
};

exports.listarReservasUsuario = async (req = request, res = response, next) => {
    try{
        const { usuarioId  } = req.params;
        const reservas = await reservaModel.find({ usuarioId });
        res.status(200).json({
            reservas
        });
        console.log(reservas);
    }catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
  }
};