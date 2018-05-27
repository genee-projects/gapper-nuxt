import { Router } from 'express'

import user from './user'

var router = Router()

router.use('/user', user)

export default router
