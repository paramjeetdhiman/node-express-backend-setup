/// common  js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => res.json({ msg: "Welcome to Contact Keeper API" }));

app.listen(PORT, () =>
  console.log(`Server started on port https://localhost:${PORT}`)
);
