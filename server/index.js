const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const {toHex} =require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "0400da8d10651d648b91219535324d0b69e4c7af3e53cda60fdf985dc8459ed9bbcb61799939a90bbcba622a766e77584b5e8f63968cfc4dd517fbc5b40a82b6f6": 100,
  "047140c41e15bfbdc3de7e774135815b76683cf56b7596fb26e17d63c8aaceda1a525ceb3d4fb869b7259b4880b9de3583542d31620017a8453bc62941f3b92566": 50,
  "047a8150046caf6bcc04b85c70d5ecfe0f8615c4b03183f90c739ec5673d31c6e3f9a2714d7ada487afb401e59e6c9de4ab078b73272690e89d75319efd3c3ffb2": 75,
};

// private keys
// 44a58313557b247e37c985ede3ef89c813ecc9cc4aab64ec62cdd11000454518
// 0f565bf47ec5d856a563529b30150e894d19ba30bc864820f17ae6edfeb7478f
// 574eb5ccf4dd0b89977d114e22e6bcc15bd064d4bd6c903c6aa3daf20414e308

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { msghash,signature, recipient, amount } = req.body;

  let sig =new Uint8Array(Object.values(signature[0]))
  const sender = toHex(secp.recoverPublicKey(msghash,sig,signature[1]));



  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
