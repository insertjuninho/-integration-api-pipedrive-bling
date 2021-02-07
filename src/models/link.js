const { Schema, model } = require('mongoose');

const linkSchema = new Schema({
    date: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Orders', linkSchema, 'Orders')