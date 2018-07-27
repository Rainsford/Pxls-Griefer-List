// ==UserScript==
// @name         Pxls Griefer List
// @namespace    https://github.com/haykam821/Pxls-Griefer-List#readme
// @version      1.0.0
// @description  View a user on the griefer list in lookups.
// @author       haykam821
// @match        http*://localhost:4567/*
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
				return users[data.username].reason;
			} else {
				return "(Not on list)";
			}
		},
		css: {
			color: "red",
		},
	});
});