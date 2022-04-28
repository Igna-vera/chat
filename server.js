const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set(`views`, `./views`);
app.set("view engine", "hbs");

const Contenedor = require("./contenedor");
const contenedor = new Contenedor("productos.js");

const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);
const chat = new Contenedor("chat.json");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  const productos = await contenedor.getAll();
  socket.emit("bienvenidoLista", productos);
  console.log("0");
  const mensajes = await chat.getAllChat();
  console.log("1");
  socket.emit("listaMensajesBienvenida", mensajes);

  socket.on("nuevoMensaje", async (data) => {
    await chat.saveChat(data);

    const mensajes = await chat.getAllChat();
    console.log("2");
    console.log(mensajes);
    io.sockets.emit("listaMensajesActualizada", mensajes);
  });

  socket.on("productoAgregado", async (data) => {
    console.log("Alguien presionó el click");
    await contenedor.saveChat(data);
    console.log("3");
    const productos = await contenedor.getAll();
    io.sockets.emit("listaActualizada", productos);
  });

  socket.on("disconnect", () => {
    console.log(" Usuario desconectado");
  });
});
//Rutas

app.get(`/productos`, async (req, res) => {
  const productosLista = await contenedor.getAll();
  res.render(`pages/list.hbs`, {
    productosLista,
  });
});

app.get("/", (req, res) => {
  res.render("pages/form.hbs", {});
  console.log("principal");
});

app.post("/productos", async (req, res) => {
  const { title, price } = req.body;
  await contenedor.save(title, price);
  res.redirect("/productos");
});

const conectedServer = httpServer.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
conectedServer.on("error", (error) => console.log(`error ${error}`));
