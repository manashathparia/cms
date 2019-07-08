const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ['subscriber', 'editor', 'author', 'administrator'],
        default: 'subscriber',
    },
    specialAccess: [String],
});




mongoose.model("User", userSchema)