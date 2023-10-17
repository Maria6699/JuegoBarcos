const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (user, done) {

    done(null, user);
});

passport.use(new GoogleStrategy({

    clientID: "427536186818-m8u7mfu3g1a9qtr8hib3gog7213ih5mb.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/google/callback"

    //clientID: "427536186818-puu6div91b2atu95ifngij1agpb3l80e.apps.googleusercontent.com",
    //clientSecret: "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",
    //callbackURL: "https://proyecto22-xrbfmbzvcq-ew.a.run.app/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        return done(null, profile);
    }
));

 passport.use(new FacebookStrategy({

     clientID: "1956819014705365",
     clientSecret: "ae7a21e21ec2a6e13f0e4f5375e308c9",
     //callbackURL: "https://proyecto22-xrbfmbzvcq-ew.a.run.app/auth/facebook/callback",
     callbackURL: "http://localhost:3001/auth/facebook/callback",
 },
    function (accessToken, refreshToken, profile, done) {

         return done(null, profile);
     }
 ));