const messages = [
  { author: "Juan", text: "Hola que tal?" },
  { author: "Pedro", text: "Muy y vos?" },
  { author: "Ana", text: "Genial" },
];
const getMessages = () => messages;

const saveMessages = () => {
  messages.push(mensaje);
};

module.exports = { getMessages, saveMessages };
