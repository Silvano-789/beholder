/* load database */
const database = require('./db');
/* load core app */
const app = require('./app');
const settingsRepository = require('./repositories/settingsRepository');
/* load exchange monitor */
const appEm = require('./app-em');
/* load web socket server */
const appWs = require('./app-ws');

settingsRepository.getDefaultSettings()
    .then(settings => {
        const server = app.listen(process.env.PORT, () => {
            console.log('App is running at port ' + process.env.PORT);
        });
        const wss = appWs(server);
        appEm(settings, wss);
    })
    .catch(err => {
        console.error(err);
    })

