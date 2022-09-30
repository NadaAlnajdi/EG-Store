require("dotenv").config();
require("../database/connection");
const cors = require("cors");
const productRoutes = require("../routes/product.routes");
const usersRoutes = require("../routes/users.routes");
const cartRoutes = require("../routes/cart.routes");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.get("/", (req, res) => res.send("server started"));
module.exports = app;
