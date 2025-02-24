const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserService = require('../services/user/userService');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        // Kiểm tra người dùng đã tồn tại chưa
        let user = await UserService.findByGoogleId(id);
        if (!user) {
            user = await UserService.findByEmail(email);
            if (!user) {
                // Tạo mới nếu chưa có tài khoản
                user = await UserService.createUser({
                    google_id: id,
                    email: email,
                    fullname: displayName,
                    is_active: true
                });
            } else {
                // Cập nhật google_id nếu tài khoản đã tồn tại
                await UserService.updateGoogleId(user.id, id);
            }
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserService.getUserById(id);
    done(null, user);
});

module.exports = passport;
