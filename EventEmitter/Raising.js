'use strict';

/**
 * Created by baohg on 26/05/2016.
 */
var events = require('events');

var em = new events.EventEmitter();

em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

module.exports = em;