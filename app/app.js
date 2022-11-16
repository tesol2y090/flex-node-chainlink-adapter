require("express-group-routes")
const app = require("express")()
const cors = require("cors")
const bodyParser = require("body-parser")

const { getQueryDataFromCID } = require("./services/query/get")
const { getGraphDataAsCIDFromQueryData } = require("./services/graph/get")
const { getDataFromCIDIPFS } = require("./services/ipfs/get")

app.use(cors())
app.use(bodyParser.json())

app.group("/query", (router) => {
  router.get("/", getQueryDataFromCID)
})

app.group("/graph", (router) => {
  router.get("/", getGraphDataAsCIDFromQueryData)
})

app.group("/ipfs", (router) => {
  router.get("/", getDataFromCIDIPFS)
})

module.exports = app
