// ==UserScript==
// @name         Pxls Griefer List
// @namespace    https://github.com/haykam821/Pxls-Griefer-List#readme
// @version      1.1.0
// @description  View a user on the griefer list in lookups.
// @author       haykam821
// @match        http*://pxls.space/*
// @grant        none
// ==/UserScript==

fetch("https://cdn.rawgit.com/haykam821/Pxls-Griefer-List/master/list.json").then(response => {
	return response.json();
}).then(json => {
	const users = json.users;
	App.lookup.registerHook({
		id: "griefer_list",
		name: "Griefer List",
		get: data => {
			const user = users[data.username];
			if (user) {
				const output = $("<span>").css("color", "red");
				
				if (user.reason.length > 2) {
					output.text(`${user.reason[0]} (${user.reason.length - 1} more entries)`);
				} else (user.reason.length === 2) {
					output.text(`${user.reason[0]} (1 more entry)`);
				} else {
					output.text(user.reason[0]);
				}
				
				return output;
			} else {
				return "(Not on list)";
			}
		},
	});
}).catch(() => {
	App.lookup.registerHook({
		id: "griefer_list",
		name: "Griefer List",
		get: () => "(Couldn't get list)",
	});
});
