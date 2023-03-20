
// it was used while generating 3 accounts used in index.js file

const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log(toHex(privateKey));
const publicKey = secp.getPublicKey(privateKey);
console.log(toHex(publicKey));

