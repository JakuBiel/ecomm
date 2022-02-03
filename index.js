const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send(`
  <div>
    <form method="post">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordconfirmation" placeholder="confirm password" />
      <button>Sign Up</button>
    </form>
  </div>
  `);
});

app.listen(3000, () => {
	console.log("listening");
});

app.post("/", (req, res) => {
	res.send("account created");
});
