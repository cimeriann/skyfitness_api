const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum:['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next;
    this.password =  await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;