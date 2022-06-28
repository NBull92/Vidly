import Raven from 'raven-js';

function init(){
    Raven.config("https://6a518391ca4e4a4897d52ad5bfdc11c3@o1297498.ingest.sentry.io/6526115",    { 
        release:'0-0-0',
        environment: 'development-test'
    }).install()
}

function log(error){
    Raven.captureException(error); //  Provide proper logging
}

export default {
    init,
    log
}