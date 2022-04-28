const fs = require(`fs`);

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.id = 1;
  }
  save(title, price) {
    let producto = { title: title, price: price, id: this.id };
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.push(producto);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos));
    this.id++;
  }
  getById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let producto = null;
    productos.forEach((product) => {
      if (product.id == id) {
        producto = product;
      }
    });
    console.log(producto);
  }

  getAll() {
    let productos = [];
    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    return productos;
  }
  deleteById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }

    let newArray = productos.filter(function (element) {
      return element.id !== id;
    });

    console.log("deleteById:" + JSON.stringify(newArray));
  }

  deleteAll() {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.length = 0;
    console.log(" deleteAll" + productos);
  }

  getRandom(productos) {
    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let productoRandom =
      productos[Math.floor(Math.random() * productos.length)];
    return productoRandom;
  }
}

module.exports = Contenedor;
