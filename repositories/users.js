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

	//GETONE
	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}

	//DELETE
	async delete(id) {
		const records = await this.getAll();
		const filteredRecords = records.filter((record) => record.id !== id);
		await this.writeALL(filteredRecords);
	}

	//UPDATE
	async update(id, attrs) {
		const records = await this.getAll();
		const record = records.find((record) => record.id === id);

		if (!record) {
			throw new Error(`Sorry no record with id = ${id} found`);
		}
		// copy all elements from 2nd arrg to 1st arrgument
		Object.assign(record, attrs);

		await this.writeALL(records);
	}

	//GETONEBY
	async getOneBy(filters) {
		const records = await this.getAll();

		for (let record of records) {
			let found = true;

			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return record;
			}
		}
	}
}

const test = async () => {
	const repo = new UsersRepository("users.json");

	const user = await repo.getOneBy({ pass: "pas" });
	console.log(user);
};

test();
