const express = require("express");

const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const app = express();
const PORT = 8080;

const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set(`views`, `./views`);

app.use(express.static("./public"));

io.on("connection", (socket) => {
  console.log("Cliente conectado");
});

//

app.get(`/productos`, async (req, res) => {
  const productosLista = await contenedor.getAll();
  res.render(`pages/list.hbs`, {
    productosLista,
  });
  console.log(productosLista);
});

app.get("/", (req, res) => {
  res.render("index.html", {});
  console.log("hola");
});

const conectedServer = httpServer.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
conectedServer.on("error", (error) => console.log(`error ${error}`));
// app.listen(PORT, () => {
//   console.log(`Sv ${PORT}`);
// });
