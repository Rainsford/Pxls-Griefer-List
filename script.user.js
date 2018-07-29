// ==UserScript==
// @name         Pxls Griefer List
// @namespace    https://github.com/haykam821/Pxls-Griefer-List#readme
// @version      1.0.0
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
			if (users[data.username]) {
				return $("<span>").css("color", "red").text(users[data.username].reason);
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
