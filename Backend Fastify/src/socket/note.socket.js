import { noteModel } from "../models/note.model.js";

export const socket = (fastify) => {
    fastify.io.on("connection", (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    // listar las notas
    const getNotes = async () => {
      const notes = await noteModel.find();
      fastify.io.emit("server:getNotes", notes);
    };
    getNotes();

    // agregar notas
    socket.on("client:addNote", async (note) => {
      await noteModel.create(note);
      getNotes();
    });

    // actualizar notas
    socket.on("client:updateNote", async (note) => {
      await noteModel.findByIdAndUpdate({ _id: note._id }, note);
      getNotes();
    });

    // eliminar nota
    socket.on("client:deleteNote", async (id) => {
      await noteModel.findByIdAndDelete0(id);
      getNotes();
    });

    // buscar notas por id
    socket.on("client:getNote", async (id) => {
      const note = await noteModel.findById(id);
      io.emit("server:getNotes", note);
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado ${socket.id}`);
    });
  });
};
