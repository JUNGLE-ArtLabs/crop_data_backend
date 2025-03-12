const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("オーガニック認証システム API");
});


const crops = [
  {
    name: "rice",
    producer: "fujimatsu_shizen_nouen",
    ipfsHash: "bafkreidj6rpk32nlz7vbvi4ldwv573gmkcaefjujkpwc7jq2t64xcsftqq", // Pinataの対象の作物のjsonデータのCID
  },
];

app.get("/crops", (req, res) => {
  res.json(crops);
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000")); // http://localhost:5000/crops アクセスするとjsonデータが見れる
