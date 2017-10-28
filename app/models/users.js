var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UsersSchema = new Schema({
    name: String,
    username: {type: String, require: true, index: {unique: true}},
    password: {type: String, require: true, select: false}
});

UsersSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    })
});

UsersSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('Users', UsersSchema);
