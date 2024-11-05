require("dotenv").config()
const { API_PORT, MONGO_URL } =process.env

const express = require("express")
const cors = require("cors")

const routes = require("./routes/index.routes")
const mogoose = require("mongoose")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocs = YAML.load("./swagger.yaml")

const app = express()
const PORT =API_PORT

app.use(express.json());
app.use(cors())

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
)

// http://localhost:3002/docs

mogoose.connect(MONGO_URL).catch(err => {
    if(err){
        console.log("tidak dapat terkoneksi monngo db")
        throw err
    }
})



app.use(routes)

app.listen(PORT, () => {
    console.log("server api berjalan di port " + PORT)
})

module.exports = app