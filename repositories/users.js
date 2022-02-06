const fs = require("fs");

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error("Creating a repository require a filename");
		}

		this.filename = filename;

		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, "[]");
		}
	}
}

new UsersRepository("users.json");
