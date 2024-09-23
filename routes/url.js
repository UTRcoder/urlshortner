const express=require("express");
const router=express.Router();

const { handleGenerateNewShortURL, handlegetAnalytics } = require("../controller/url");

router.get("/analytics/:shortId", handlegetAnalytics); 
router.post("/", handleGenerateNewShortURL);

module.exports= router;