import { Schema, models, model } from "mongoose";

const InputEntrySchema = new Schema({
  date: { type: String, required: true },
  workName: { type: String, required: true },
  pieces: { type: Number, required: true },
  note: { type: String, default: "" },
});

const OutputEntrySchema = new Schema({
  date: { type: String, required: true },
  pieces: { type: Number, required: true },
  note: { type: String, default: "" },
});

const ProcessSchema = new Schema({
  serial: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  label: { type: String, default: "" },
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    inputs: [InputEntrySchema],
    outputs: [OutputEntrySchema],
    processes: [ProcessSchema],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;