import yaml from 'js-yaml'
import fs from 'fs'

const contents = fs.readFileSync(__dirname + '/../config.yml', 'utf-8')
const config = yaml.safeLoad(contents)

export default config || {}
