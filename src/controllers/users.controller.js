// src/controllers/users.controller.js
const userService = require('../services/users.service');
const AppError = require('../utils/AppError');

const getAll = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error); // ← ya no responde aquí, delega al errorHandler
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await userService.remove(req.params.id);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };