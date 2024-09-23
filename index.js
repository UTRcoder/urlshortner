const express = require("express");
const cookieParser=require("cookie-parser")
const path=require("path")
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
// const {restrictToLoggedInUserOnly, checkAuth}=require("./middleware/auth")
const {checkForAuthentication, restrictTo}=require("./middleware/auth")

// imports all routes
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const { buildlog } = require("../NodeJS/middlewares/buildlog");

const app=express();
const PORT=8000;
//mongodb connect 
connectToMongoDB("mongodb://localhost:27017/short-url")

//views- ejs (Server side rendering-SSR)
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
// middlew are to parese body
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(buildlog("log.txt"));
//route
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if(!entry) res.status(404).json({msg:"record not found"});
    res.redirect(entry.redirectURL);
  });
// app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use("/url",restrictTo(["NORMAL"]),urlRoute);
app.use("/user", userRoute);
// app.use("/",checkAuth, staticRoute);
app.use("/", staticRoute);


app.listen(PORT, () => console.log(`Server Started at: ${PORT}`))