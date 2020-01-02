'use strict';

const log = function() {
    console.log.apply(null, arguments);
}

const err = function() {
    console.error.apply(null, arguments);
}

exports.logger = {log,err};