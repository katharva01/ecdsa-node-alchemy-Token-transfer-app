

// this script is created for just testing purpose 
// to test if public key recovered is correct or not 
// ignore this file as it doesn't have any use in project

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");



const fun =async()=>{
const privateKey="44a58313557b247e37c985ede3ef89c813ecc9cc4aab64ec62cdd11000454518";
const msgHash= await secp.utils.sha256("amount");
console.log(toHex(msgHash));
const signMsg = await secp.sign(msgHash,privateKey,{recovered:true});
console.log(signMsg[0]);
pKey=toHex(secp.recoverPublicKey(msgHash,signMsg[0],signMsg[1]));
console.log(pKey);
};

fun();