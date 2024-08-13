const passport = require("passport");
const LocalStrategy = require("passport-local");
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      console.log("received credentials", USERNAME, PASSWORD);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false);
      }
      const ispassmatch =await user.comparepassword(PASSWORD);
      if (ispassmatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports=passport;