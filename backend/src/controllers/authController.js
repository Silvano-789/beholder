const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const settingsRepository = require('../repositories/settingsRepository');

async function doLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const settings = await settingsRepository.getSettingByEmail(email);

    if (settings) {
        const isValid = bcrypt.compareSync(password, settings.password);
        if (isValid) {
            const token = jwt.sign({ id: settings.id }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRES)
            })
            res.json({ token });
        }
    }
    res.sendStatus(401);
}

const blackList = [];

function doLogout(req, res, next) {
    const token = req.headers['authorization'];
    blackList.push(token);
    res.sendStatus(200);
}

function isBlackListed(token) {
    return blackList.some(t => t === token);
}

module.exports = {
    doLogin,
    doLogout,
    isBlackListed
}