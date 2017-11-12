import passport from 'passport';
import localStrategy from 'passport-local'
import authenticationMiddleware from './middleware';
import encryption from './Encryption';
import model from '../models/model';

const LocalStrategy = localStrategy.Strategy;

function findUser (userguid, callback) {

  Model.User.findOne({
    where: {
      GUID: userguid
    }
  })
  .then(function(result) {
    if (typeof result !== 'undefined' && result !== null){
      return callback(null, result);
    }
    return callback(null);
  })
  .catch(function(err) {
    console.log(err);
  });
}

passport.serializeUser(function (user, cb) {
  cb(null, user.GUID)
})

passport.deserializeUser(function (userguid, cb) {
  findUser(userguid, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(userguid, password, done) {
      findUser(userguid, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (!encryption.checkForCorrectPassword(password, user.Password, user.Salt)) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ))

}

module.exports = initPassport