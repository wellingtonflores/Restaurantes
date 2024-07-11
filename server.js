import { app } from "./app.js";

const port = 4000;

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
})