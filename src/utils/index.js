const getFileUrl = (cid, fileName) => {
  return `https://${cid}.ipfs.w3s.link/${fileName}`
}

module.exports = {
  getFileUrl,
}
