const User = require('../models/user');

const register = async function(req) {
    const { email, password } = req.body;

    const existsUser = await User.findOne({email: email});

    if(existsUser) { throw new Error(`User already exists with email ${email}`); }

    const newUser = await new User({
        email: email.toLowerCase(),
        password: password
    });

    await newUser.save();
    return { newUser };
}

const registerNotVuln = async function(req) {

    const { email, password } = req.body;

    const newUser = await new User({
        email: email,
        password: password
    })

    await newUser.save();
    return newUser;
}

exports.register = register;
exports.registerNotVuln = registerNotVuln;

