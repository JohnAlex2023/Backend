const userService = require('../services/users.service');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/AppError');
const User = require('../models/user.model');

const register = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //busca el usuario incluyendo la contraseña ( normalemnte la excluimos)

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Credenciales invalidas', 401);
    }

    //compara la contraseña ingresada con la incriptada. 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Credenciales invalidas', 401); 
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };