const settingsModel = require('../models/settingsModel');

function getSettingByEmail(email) {
    return settingsModel.findOne({ where: { email } });
}

module.exports = {
    getSettingByEmail
}