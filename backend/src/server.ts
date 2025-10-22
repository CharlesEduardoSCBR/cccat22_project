import app from "./api";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});