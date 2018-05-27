import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'

import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

var FileStore = require('session-file-store')(session)

var sessionStore = new FileStore()

// Add session middleware
app.use(
    session({
        store: sessionStore,
        secret: process.env.SESSION_SECRET || '83719730',
        resave: true,
        saveUninitialized: false
    })
)

app.use('/api', bodyParser.json())
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
