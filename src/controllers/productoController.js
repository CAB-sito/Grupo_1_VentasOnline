//const fs = require("fs");
//const path = require("path");
const db = require("../database/models");



/*const productos = require("../data/product.json");

const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));*/

const productoController = {
  index: (req, res) => {
    res.redirect("/cart");
  },
  detail: (req, res) => {
    const id = req.params.id;
    db.Producto.findByPk(id)
      .then((producto)=>{
        if (!producto) {
          return res.send("No se encontro el producto");
        }else{
        res.render("details", { producto: producto, usuario: req.session.usuario });
        }
      })

  },

  cart: (req, res) => {
    db.Producto.findAll()
      .then((productos)=>{
        res.render("productCart", {listaProductos: productos, usuario: req.session.usuario});
      })
    
  },
  crear: (req, res) => {
    res.render("crearProducto", { usuario: req.session.usuario });
  },

  guardarProducto: (req, res) => {
    
    let imagen;
    if (req.file) {
      imagen = req.file.filename;
    } else {
      imagen = "default.png ";
    }

    db.Producto.create({
      nombre: req.body.name,
      marca: req.body.marca,
      imagen: imagen,
      id_categoria_producto: req.body.category,
      color: req.body.color,
      precio: req.body.price,
      descuento: req.body.discount,
    });
   
    res.redirect("/products");

    
  },

  listar: (req, res) => {
    db.Producto.findAll()
      .then((productos)=>{
        res.render("listarProducto", {listaProductos: productos, usuario: req.session.usuario});
      })
  },
  modificar: (req, res) => {
    const id = req.params.id;
    db.Producto.findByPk(id)
      .then((producto)=>{
        if (!producto) {
          return res.send("No se encontro el producto");
        }else{
          res.render("modificarProducto", {producto: producto,usuario: req.session.usuario});
        }
      });
    
  },

  editar: (req, res) => {
    let imagen;
    if (req.file) {
      imagen = req.file.filename;
    } else {
      imagen = "default.png";
    }
    db.Producto.create({
      nombre: req.body.name,
      marca: req.body.marca,
      imagen: imagen,
      color: req.body.color,
      precio: req.body.price,
      descuento: req.body.discount,
    },{
      where:{id:req.params.id}
    });
    res.redirect("/products");
    
  },

  eliminar: (req, res) => { 
    
    db.Producto.destroy({
      where:{id:req.params.id}
    });
    res.redirect("/products");
  },
};

module.exports = productoController;
