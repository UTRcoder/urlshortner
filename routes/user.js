const express=require("express");
const router=express.Router();
const { handleUserSingup, handleUserLogin } = require("../controller/user");

router.post("/", handleUserSingup);
router.post("/login", handleUserLogin)

module.exports=router;