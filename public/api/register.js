import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("donacion-organos");
    const collection = db.collection("registrations");

    const { nombre, ciudad, edad, historiaID, aceptoPolitica } = req.body;

    if (!nombre || !ciudad || !edad || !aceptoPolitica) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    await collection.insertOne({
      nombre,
      ciudad,
      edad,
      historiaID,
      aceptoPolitica,
      fecha: new Date(),
      userAgent: req.headers["user-agent"]
    });

    return res.status(200).json({ message: "Registro guardado" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno" });
  }
}