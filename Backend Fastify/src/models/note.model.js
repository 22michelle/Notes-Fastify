import mongoose from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el campo title es requerido"],
    },

    description: {
      type: String,
      required: [true, "el campo description es requerido"],
    },
  },
  { timestamps: true }
);

export const noteModel = model("note", noteSchema)