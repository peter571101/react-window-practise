import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_mysql-password",
  database: "dorm_management",
});

app.get("/api/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("查询失败", err);
    }
    res.json({ results });
  });
});

app.listen(3080, () => {
  console.log("后端服务已启动：http://localhost:3080");
});
