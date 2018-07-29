const fs = require("fs-extra");
const yargs = require("yargs");

const listPath = "./../list.json";

const defaultUser = {
	reason: [],
};

async function runWithList(func) {
	const list = await fs.readJSON(listPath);
	fs.writeJSON(listPath, func(list), {
		spaces: "\t",
	});
}

yargs.command("add <user> [reasons...]", "Adds a reason to a user.", builder => {
	builder.positional("user", {});
	builder.positional("reasons", {});
}, async argv => {
	runWithList(list => {
		if (!list.users[argv.user]) {
			list.users[argv.user] = defaultUser;
		}

		const user = list.users[argv.user];
		user.reason.push(...argv.reasons);

		return list;
	});
});
yargs.command("clear <user>", "Clears a user's data on the list.", builder => {
	builder.positional("user", {});
}, async argv => {
	runWithList(list => {
		list.users[argv.user] = defaultUser;
		return list;
	});
});
yargs.command("remove <user>", "Removes a user from the list.", builder => {
	builder.positional("user", {});
}, async argv => {
	runWithList(list => {
		list.users[argv.user] = undefined;
		return list;
	});
});

yargs.argv;