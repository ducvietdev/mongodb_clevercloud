const httpProxy = require('express-http-proxy')
const listServiceProxy = httpProxy('http://localhost:5002')
const addServiceProxy = httpProxy('http://localhost:5002/tasks/add')

module.exports = {
    listServiceProxy,
    addServiceProxy
}