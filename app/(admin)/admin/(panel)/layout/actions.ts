"use server";

import { connectDB } from "@/lib/db-connect";
import Product from "./models";
import { IInputEntry, IOutputEntry, IProcess } from "./types";
import { revalidatePath } from "next/cache";

// ---------- Product ----------
export async function createProduct(name: string) {
  await connectDB();
  const p = await Product.create({ name, inputs: [], outputs: [], processes: [] });
  revalidatePath("/products");
  return JSON.parse(JSON.stringify(p));
}

export async function getProducts() {
  await connectDB();
  const list = await Product.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(list));
}

export async function updateProduct(id: string, name: string) {
  await connectDB();
  await Product.findByIdAndUpdate(id, { name });
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath("/products");
}

// ---------- Input ----------
export async function addInput(productId: string, data: IInputEntry) {
  await connectDB();
  await Product.findByIdAndUpdate(productId, { $push: { inputs: data } });
  revalidatePath("/products");
}

export async function updateInput(
  productId: string,
  inputId: string,
  data: Partial<IInputEntry>
) {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  const entry = product.inputs.id(inputId);
  if (!entry) throw new Error("Input entry not found");
  Object.assign(entry, data);
  await product.save();
  revalidatePath("/products");
}

export async function deleteInput(productId: string, inputId: string) {
  await connectDB();
  await Product.findByIdAndUpdate(productId, { $pull: { inputs: { _id: inputId } } });
  revalidatePath("/products");
}

// ---------- Output ----------
export async function addOutput(productId: string, data: IOutputEntry) {
  await connectDB();
  await Product.findByIdAndUpdate(productId, { $push: { outputs: data } });
  revalidatePath("/products");
}

export async function updateOutput(
  productId: string,
  outputId: string,
  data: Partial<IOutputEntry>
) {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  const entry = product.outputs.id(outputId);
  if (!entry) throw new Error("Output entry not found");
  Object.assign(entry, data);
  await product.save();
  revalidatePath("/products");
}

export async function deleteOutput(productId: string, outputId: string) {
  await connectDB();
  await Product.findByIdAndUpdate(productId, { $pull: { outputs: { _id: outputId } } });
  revalidatePath("/products");
}

// ---------- Process ----------
export async function addProcess(productId: string, data: IProcess) {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  const nextSerial = product.processes.length
    ? Math.max(...product.processes.map((p: IProcess) => p.serial)) + 1
    : 1;
  await Product.findByIdAndUpdate(productId, {
    $push: { processes: { ...data, serial: nextSerial } },
  });
  revalidatePath("/products");
}

export async function updateProcess(
  productId: string,
  processId: string,
  data: Partial<IProcess>
) {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  const proc = product.processes.id(processId);
  if (!proc) throw new Error("Process not found");
  Object.assign(proc, data);
  await product.save();
  revalidatePath("/products");
}

export async function deleteProcess(productId: string, processId: string) {
  await connectDB();
  await Product.findByIdAndUpdate(productId, { $pull: { processes: { _id: processId } } });
  revalidatePath("/products");
}

export async function reorderProcesses(productId: string, orderedIds: string[]) {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  orderedIds.forEach((id, idx) => {
    const proc = product.processes.id(id);
    if (proc) proc.serial = idx + 1;
  });
  await product.save();
  revalidatePath("/products");
}