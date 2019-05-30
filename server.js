const express = require("express");

const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const routes = require("./controllers/burgers_controller");

const PORT = process.env.PORT || 1029;
const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is starting at PORT ${PORT}`);


});
