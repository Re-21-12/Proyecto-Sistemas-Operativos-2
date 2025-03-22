const express = require("express");
const pg = require("pg");
const cors = require("cors");

const { Pool } = pg;
const app = express();
const port = 5000; // Se cambia el puerto para evitar conflictos con el frontend

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:4200", // Permite solicitudes solo desde el frontend en desarrollo
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json()); // Permite parsear JSON en las peticiones

// Configuración de la base de datos
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "password",
  port: 5432,
});

// Verificar conexión con la base de datos
pool
  .connect()
  .then(() => console.log("🟢 Conectado a la base de datos"))
  .catch((err) =>
    console.error("🔴 Error de conexión a la base de datos:", err)
  );

// GET - Obtener todos los registros
app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Proof");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

// GET - Obtener un registro por ID (corregido a método GET)
app.get("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Proof WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el registro" });
  }
});

// POST - Crear nuevo registro
app.post("/api/items", async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "ID y Name son requeridos" });
    }
    const result = await pool.query(
      "INSERT INTO Proof (id, name) VALUES ($1, $2) RETURNING *",
      [id, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el registro" });
  }
});

// PUT - Actualizar un registro
app.put("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "El campo 'name' es requerido" });
    }
    const result = await pool.query(
      "UPDATE Proof SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el registro" });
  }
});

// DELETE - Eliminar un registro (cambiado a método DELETE)
app.delete("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM Proof WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el registro" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 API corriendo en http://localhost:${port}`);
});
