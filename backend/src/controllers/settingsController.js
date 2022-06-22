const settingsRepository = require('../repositories/settingsRepository');
async function getSettings(req, res, next) {
    const settingsId = res.locals.token.id;
    const settings = await settingsRepository.getSettings(settingsId);
    res.json(settings);
}

async function updateSettings(req, res, next) {
    const settingsId = res.locals.token.id;
    const newSettings = req.body;
    settingsRepository.updateSettings(settingsId, newSettings);
    res.sendStatus(200);
}

module.exports = { getSettings, updateSettings }