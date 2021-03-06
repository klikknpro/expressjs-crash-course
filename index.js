const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// add middleware so "it" knows how to use handlebars
// ... sure
// HandleBars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 5. init middleware
// wtf is middleware
// it runs anytime we make a request (now with postman)
// app.use(logger);

// 1. create a route "/"
// sending something back when they request stuff through "/" route
// but we dont wanna write routes manually
// so lets do the app.use(blabla)
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// 8. initialize some stuff for the POST as middleware
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 11. handlebars something lofasz
// homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "member app",
    members,
  })
);

// 2. create a static server
// set static folder "public"
// just put the files into this folder and it works
// but most of the times we do something dynamic, so this static shit will be kinda useless
app.use(express.static(path.join(__dirname, "public")));

// 7. doing fuck knows what
// members api routes
app.use("/api/members", require("./routes/api/members"));

// 5000 usually in development
// but if environment variable is available then we're running on that
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
