import { ObjectId } from "mongodb";
import { db } from "../server.js";

export async function getProducts(req, res) {
  const data = await db.collection(process.env.COLLECTION_NAME).find({}).toArray();
  return res.json({ data });
}

export async function getProduct(req, res) {
  const id =
    String(req.params.id).length === 1
      ? Number(req.params.id)
      : ObjectId.createFromHexString(req.params.id);
  const data = await db.collection(process.env.COLLECTION_NAME).findOne({ _id: id });
  return res.json({ data });
}

export async function updateProduct(req, res) {
  const { name, type, price, rating, available, warranty_years } = req.body;
  const id =
    String(req.params.id).length === 1
      ? Number(req.params.id)
      : ObjectId.createFromHexString(req.params.id);
  const data = await db
    .collection(process.env.COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: id },
      { $set: { name, type, price, rating, available, warranty_years } },
      { returnDocument: true },
    );
  return res.json({ data });
}

export async function createProduct(req, res) {
  const { name, type, price, rating, available, warranty_years } = req.body;
  const data = await db
    .collection(process.env.COLLECTION_NAME)
    .insertOne({ name, type, price, rating, available, warranty_years });
  return res.json({ data });
}

export async function deleteProduct(req, res) {
  const id =
    String(req.params.id).length === 1
      ? Number(req.params.id)
      : ObjectId.createFromHexString(req.params.id);

  const data = await db.collection(process.env.COLLECTION_NAME).deleteOne({ _id: id });
  return res.json({ data });
}
