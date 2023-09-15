const bcrypt = require('bcryptjs');
const { User } = require("./models");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        console.log("serializer");
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("deserializer");
        console.log(id);
        try {
            var user = await User.findOne({ where: { id: id } });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (username, password, done) => {
            console.log(username);
            try {
                var user = await User.findOne({ where: { email: username } });
                console.log("user");
                console.log(user)
                // usuário inexistente
                if (!user) { return done(null, false) }

                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false)

                return done(null, user)
            } catch (err) {
                return done(err, false);
            }
        }
    ));
}