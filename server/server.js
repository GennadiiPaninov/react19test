const express = require("express")
const app = express()
const cors = require('cors')
const corsOptions = {
    origin: ['http://localhost:5173'],
}

app.use(cors(corsOptions))
app.use(express.json());

let users = [{name: "user1", id: "1"}, {name: "user2", id: "2"}, {name: "user3", id: "3"}];

app.get("/api", (req, res) => {
    res.json({ users });
});

app.post("/api", (req, res) => {
    const { user } = req.body;

    if (!user || !user.name || !user.id) {
        return res.status(400).json({ error: "Некорректные данные пользователя" });
    }

    // Проверяем на дублирующиеся ID
    if (users.some((u) => u.id === user.id)) {
        return res.status(400).json({ error: "Пользователь с таким ID уже существует" });
    }
    setTimeout(() => {
        users = [...users, user];
        res.json({ message: "Массив обновлен", users });
    }, 2000);
});


app.listen(8080, ()=>{
    console.log("server started on port 8080")
} )