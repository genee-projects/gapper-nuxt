import { Router } from 'express'
import crypto from 'crypto'
import axios from '../../plugins/axios'
import config from '../../plugins/config'

const router = Router()

async function auth(username, password) {
    let url = (config.gapperBase || 'http://gapper.in') + '/api/v1/auth/verify'
    const e = encodeURIComponent
    let { data } = await axios.get(
        url + '?username=' + e(username) + '&password=' + e(password)
    )
    return data
}

router.post('/login', function(req, res, next) {
    auth(req.body.username, req.body.password)
        .then(data => {
            req.session.user = data
            res.json({
                username: data.username,
                name: data.name,
                email: data.email,
                phone: data.phone,
                token: req.session.id
            })
        })
        .catch(e => {
            console.log(e.response.status + ': ' + e.response.statusText)
            res.sendStatus(401)
        })
})

router.post('/logout', function(req, res, next) {
    req.session.destroy()
    res.json(true)
})

router.get('/status', function(req, res, next) {
    var user = req.session.user
    if (user) {
        res.json({
            username: user.username,
            token: req.session.id
        })
    } else {
        res.sendStatus(401)
    }
})

export default router
