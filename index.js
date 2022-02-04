const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send(`
  <div>
    <form method="post">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="confirm password" />
      <button>Sign Up</button>
    </form>
  </div>
  `);
});

app.listen(3000, () => {
	console.log("listening");
});

app.post("/", (req, res) => {
	req.on("data", (data) => {
		const parsed = data.toString("utf8").split("&");
		const formData = {};
		for (let pair of parsed) {
			const [key, value] = pair.split("=");
			formData[key] = value;
		}
		console.log(formData);
	});
	res.send("account created");
});
