const axios = require("axios")

async function main() {
  return await axios.get("http://localhost:8080/getCompoundCredits", {
    data: {
      account: "0x5142126b4573ae1a23e4c8ab2a16631cae725325",
    },
  })
}

main()
  .then((response) => {
    console.log("proof", response.credits)
  })
  .catch(console.error)
