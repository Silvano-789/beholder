function getSettings(req, res, next) {
    res.json({
        email: 'silvano789@hotmail.com',
    });
}
module.exports = { getSettings }