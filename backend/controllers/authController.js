const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userModel = require('../models/userModel');

exports.signup = async (req = request, res = response, next) => {
    const { nombre, correo, password } = req.body;
    const passwordEncrypt = bcrypt.hashSync(password, 12);
    try {
        const user = new userModel({
          nombre,
          correo,
          password: passwordEncrypt
        });
        result = await user.save();
        return res.status(201).json({
          msg: "Usuario creado correctamente",
          userId: result._id
        });
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

exports.login = async (req = request, res = response, next) => {
    const { correo, password } = req.body;
    try {
        const user = await userModel.findOne({ correo });
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            res.status(401).json({
              data: [
                {
                  msg: 'Error en el correo o contraseña'
                }
              ]
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY_TOKEN, { expiresIn: "1h" });
        res.json({ token });
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}