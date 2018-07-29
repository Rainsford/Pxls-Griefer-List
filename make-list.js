(input => {
	var e = {};
    input.forEach(d => {
        const f = d.split(" - ");
		if (e[f[0]]) {
			e[f[0]].reason.push(f[1]);
        } else {
            e[f[0]] = {
                reason: [
					f[1]
				]
            };
        }
    });
    return JSON.stringify(e, null, "\t")
})([])
