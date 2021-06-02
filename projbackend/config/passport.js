const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');

//Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//De-serialize
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    //it attaches user to req object ==> (req.user)
    done(null, user);
  });
});

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8000/api/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const isFound = await User.findOne({ email });
      if (isFound) {
        // User is already registered
        done(null, isFound);
      } else {
        // User is not registered
        const user = new User({
          name: profile.name.givenName,
          lastname: profile.name.familyName,
          email,
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    }
  )
);
