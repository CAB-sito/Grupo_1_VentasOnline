const fs = require(`fs`);

function productList() {
  return JSON.parse(fs.readFileSync("product.json", "utf-8"));
}

const productos = require("../data/product.json");

const productoController = {
  index: (req, res) => {
    res.redirect("/cart");
  },
  detail: (req, res) => {
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }

    res.render("details", { producto: producto });
  },
  cart: (req, res) => {
    res.render("productCart", { listaProductos: productos });
  },
  crear: (req, res) => {
    res.render("crearProducto");
  },
  listar: (req, res) => {
    res.render("listarProducto", { listaProductos: productos });
  },
  modificar: (req, res) => {
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }
    res.render("modificarProducto", { producto: producto });
  },
};

module.exports = productoController;
