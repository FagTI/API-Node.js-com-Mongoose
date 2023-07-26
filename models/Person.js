const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    age: Number,
    salary: Number,
    aproved: Boolean,
});

module.exports = Person;