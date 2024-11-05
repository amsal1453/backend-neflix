function ok(respone, statusCode, data, message) {
    respone.status(statusCode).json({ isError: false, data, message })
}

function ERR(respone, statusCode, message) {
    respone.status(statusCode).json({ isError: true, message })
}


module.exports = { ok, ERR }