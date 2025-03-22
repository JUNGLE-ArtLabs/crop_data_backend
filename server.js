const express = require("express");
const cors = require("cors");
const axios = require("axios"); // HTTPリクエスト用のaxiosライブラリ

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("作物データ API");
});

// PinataにアップロードしたCIDを使用してJSONデータを取得する
const ipfsHash = "bafkreics3bcoxrz3zuyrp6pjumnxsxhswbgv5kuhhs7mgfe5n6n2wpzzfe"; // 例: CID
const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`; // PinataゲートウェイURL

app.get("/crops", async (req, res) => {
  try {
    const response = await axios.get(ipfsUrl); // Pinataからデータを取得
    const cropData = response.data; // JSONデータ
    res.json(cropData); // JSONデータをそのまま返す
  } catch (error) {
    console.error("データ取得エラー:", error);
    res.status(500).json({ message: "作物データの取得に失敗しました" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
