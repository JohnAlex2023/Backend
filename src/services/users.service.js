const User = require('../models/user.model');
const AppError = require('../utils/AppError');

//obtener datos de usuarios
const findAll = async () => {
    return await User.find().select('-password');
};

//obtener usuario por su id
const findById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new AppError('usuario no encontrado,', 404);
    return user;
};

//crear un nuevo usuario
const create = async (userData) => {
    const { name, email, password } = userData;

    //regla de negocio, ya existe ese email?
    const existing = await User.findOne({ email });
    if (existing) throw new AppError('Ya existe un usuario con este email', 400);
    

    const user = await User.create({ name, email, password});

    //devilvemos el usuario sin la contraseña

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;

};

//actualizar usuario

const update = async (id, userData) => {
    const user = await User.findByIdAndUpdate(
        id,
        userData,
        { new: true, runValidators: true} //new: devuelve dato actualizado
    ).select('-password');

    if (!user) throw new AppError('usuario no encontrado', 404);
    return user;
};

//eliminar usuario

const remove = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError('usuario no encontrado', 404);
    return { message: 'usuario eliminado correctamente'}
};

module.exports = { findAll, findById, create, update, remove };