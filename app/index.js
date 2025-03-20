const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

// Configura la conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "db", // Nombre del servicio en Docker Compose
  database: "postgres",
  password: "password",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("API está corriendo");
});

// Endpoint para obtener datos desde PostgreSQL
app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Proof");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en la base de datos");
  }
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
