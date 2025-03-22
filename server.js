const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("作物データ API");
});


const crops = [
  {
    name: "hakusai",
    producer: "unju_shizen_nouen",
    ipfsHash: "bafkreics3bcoxrz3zuyrp6pjumnxsxhswbgv5kuhhs7mgfe5n6n2wpzzfe", // Pinataの対象の作物のjsonデータのCID
  },
];

app.get("/crops", (req, res) => {
  res.json(crops);
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000")); // http://localhost:5000/crops アクセスするとjsonデータが見れる
