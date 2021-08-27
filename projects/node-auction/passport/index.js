const passport = require('passport');

const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) throw new Error('Not found user');
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    local();
};
