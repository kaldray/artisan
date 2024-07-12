import cors from "cors";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

import { router } from "./router.js";

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@test.jfgb8i5.mongodb.net/?retryWrites=true&w=majority&appName=test`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Server is running!"));
app.use("/api", router);

export const db = client.db("artisan");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
