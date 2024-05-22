//passport.js for fb and google auth
//importing the requirements for passportfb and passportgoogle
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user.model");

const Google_Email = (passport)=>{
    const GOOGLE_CLIENT_ID = "471660212929-56slqnk260nnk7snhn8e34sh3o4rpequ.apps.googleusercontent.com";//"287120196822-sheo1ch0ejobbsbgtuhd7689asd01aue.apps.googleusercontent.com";
    const GOOGLE_CLIENT_SECRET = "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";//"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";
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://playcryptidweb.azurewebsites.net/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ OAuthID: profile.id });
        
                if (!user) {
                    user = new User({
                        OAuthID: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        usertType:"user"
                    });
                    await user.save();
                }
        
                return done(null, user);
            } catch (error) {
                console.error('Error during Google OAuth:', error);
                return done(error, null);
            }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

const Facebook_Email = (passport) => {
    const FACEBOOK_CLIENT_ID = "1216354019390857";
    const FACEBOOK_CLIENT_SECRET = "480713efd2f7b5d741d2390935766641";

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: "https://playcryptidweb.azurewebsites.net/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name'] // Ensure the fields are requested
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ OAuthID: profile.id });
            if (!user) {
                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                if (!email) {
                    throw new Error('Email not available in Facebook profile');
                }
                user = new User({
                    OAuthID: profile.id,
                    email: email,
                    username: profile.displayName,
                    usertType: "user"
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            if (error.message.includes('authorization code has been used')) {
                console.error('Authorization code has already been used:', error);
                return done(null, false, { message: 'Authorization code has already been used. Please try logging in again.' });
            } else {
                console.error('Error during Facebook OAuth:', error);
                return done(error, null);
            }
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

module.exports = {
    Google_Email,
    Facebook_Email
}
