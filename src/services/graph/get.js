const { gql, request } = require("graphql-request")
const { Web3Storage, File } = require("web3.storage")
const { getFileUrl } = require("../../utils")
const axios = require("axios").default
const { Base64 } = require("js-base64")
require("dotenv").config()

const web3ApiKey = process.env.WEB3_STORAGE_API
const storage = new Web3Storage({ token: web3ApiKey })

const getGraphDataAsCIDFromQueryData = async (req, res) => {
  if (!req.body.data) {
    return res.status(400).json({
      error: "expected `data` in body of request",
    })
  }
  console.log("req.body.data", req.body.data)

  const { account, endpoint, query, chainId, name } = req.body.data

  if (!account || !endpoint || !chainId || !name || !query) {
    return res.status(400).json({
      error: "invalid request",
    })
  }

  const variables = {
    account: account,
    borrower: account,
  }

  const queryDecoded = Base64.decode(query)

  try {
    const dataRes = await request(endpoint, queryDecoded, variables)

    const buffer = Buffer.from(JSON.stringify(dataRes))
    const dataFile = [new File([buffer], `${name}-${chainId}-${account}.json`)]
    const cid = await storage.put(dataFile)

    console.log("stored files with cid:", cid)

    return res.status(200).json({
      data: {
        cid,
      },
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: "something went wrong",
    })
  }
}

module.exports = {
  getGraphDataAsCIDFromQueryData,
}
