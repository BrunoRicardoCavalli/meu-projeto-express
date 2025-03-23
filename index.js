import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
const PORT = 3008;

// Middleware para interpretar JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Usuário do MySQL
    password: "R&4vWz9*2tB@7QmX", // Senha do MySQL (altere se necessário)
    database: "Pessoas" // Nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

// Nova rota para salvar a idade no banco de dados
app.post("/salvar-idade", (req, res) => {
    const { idade } = req.body;

    if (typeof idade !== "number") {
        return res.status(400).json({ error: "O campo idade deve ser um número." });
    }

    const query = "INSERT INTO pessoa (idade) VALUES (?)";
    db.query(query, [idade], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao salvar no banco de dados.", details: err });
        }

        res.json({ message: "Idade salva com sucesso!", id: result.insertId });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
