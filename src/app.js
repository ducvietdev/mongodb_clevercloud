const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { create } = require("express-handlebars");

const indexRoutes = require("./routes/tasks.routes");
const db = require("./utils/mongoose");

const app = express();

// settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(indexRoutes);

// public route
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

db.connect()

const PORT = process.env.PORT || 5002
app.get('', (req, res) => res.send("Hello World!!!"))

app.listen(PORT, () => console.log(`Hello ${PORT}`))

