const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { create } = require("express-handlebars");

const indexRoutes = require("./routes/tasks.routes");
const db = require("./utils/mongoose");
const { listServiceProxy, addServiceProxy } = require("./utils/api-gateway");

const app = express();
// Tạo một Express ứng dụng cho API gateway
const gatewayApp = express();

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
// Proxy request
gatewayApp.get('/', (req, res, next) => {
  listServiceProxy(req, res, next)
})

gatewayApp.post('/tasks/add', (req, res, next) => {
  addServiceProxy(req, res, next)
})

// public route
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

db.connect()

const PORT = 5002
const GatewayPort = 5003
app.get('', (req, res) => res.send("Hello World!!!"))

app.listen(PORT, () => console.log(`Hello ${PORT}`))
gatewayApp.listen(GatewayPort, () => console.log(`Hello ${GatewayPort}`))

