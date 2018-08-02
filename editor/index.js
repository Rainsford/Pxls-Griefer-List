const fs = require("fs-extra");
const yargs = require("yargs");

const simple = require("simple-git");
const git = simple("./../");

const listPath = "./../list.json";

const defaultUser = {
	reason: [],
};

async function runWithList(func, commitMsg) {
    const list = await fs.readJSON(listPath);
	await fs.writeJSON(listPath, func(list), {
		spaces: "\t",
    });

    if (commitMsg) {
        git.commit(commitMsg, "list.json");
    }
}

function commitOption(builder) {
    return builder.option("commit", {
        description: "Commits the changes to the list after the action takes place.",
        type: "boolean",
        default: true,
    });
}
function userPositional(builder) {
    return builder.positional("user", {
        description: "The target user.",
        type: "string",
    });
}

yargs.command("add <user> [reasons...]", "Adds a reason to a user.", builder => {
    commitOption(builder);
    userPositional(builder);
	builder.positional("reasons", {
        description: "The reason(s) this user is on the list.",
    });
}, async argv => {
	runWithList(list => {
		if (!list.users[argv.user]) {
			list.users[argv.user] = defaultUser;
		}

		const user = list.users[argv.user];
        user.reason.push(...argv.reasons);

		return list;
	}, argv.commit ? `Added ${argv.user} to list` : undefined);
});
yargs.command("clear <user>", "Clears a user's data on the list.", builder => {
    commitOption(builder);
    userPositional(builder);
}, async argv => {
	runWithList(list => {
		list.users[argv.user] = defaultUser;
		return list;
    }, argv.commit ? `Cleared ${argv.user} on list` : undefined);
});
yargs.command("remove <user>", "Removes a user from the list.", builder => {
    commitOption(builder);
    userPositional(builder);
}, async argv => {
	runWithList(list => {
		list.users[argv.user] = undefined;
		return list;
    }), argv.commit ? `Removed ${argv.user} from list` : undefined;
});

yargs.argv;