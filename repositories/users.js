const fs = require("fs");
const crypto = require("crypto");

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

	//GETALL
	async getAll() {
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding: "utf8",
			})
		);
	}

	//CREATE
	async create(attrs) {
		attrs.id = this.randomId();

		const records = await this.getAll();
		records.push(attrs);

		await this.writeALL(records);
	}

	//WRITEALL
	async writeALL(records) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		);
	}

	//RANDOMID
	randomId() {
		return crypto.randomBytes(4).toString("hex");
	}
}

const test = async () => {
	const repo = new UsersRepository("users.json");

	await repo.create({ email: "test@test.com", password: "pass" });

	const users = await repo.getAll();
	console.log(users);
};

test();
