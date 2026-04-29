const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true, //elimina espacios al inicio y al final, digitados por error
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true, //minusculas
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'Minimo 6 caracteres'],
            select: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, //agrega createdAt y updatedAt automaticamente
    }
);


//se ejecuta automaticamente antes de guardar en la BD
userSchema.pre('save', async function () {
    //si la contraseña no fue modificada, no la vuelvas a encriptar
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

//metodo para comparar contraseña al hacer login 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);