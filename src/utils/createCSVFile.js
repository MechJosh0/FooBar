export default (filename, rows) =>
{
	let csvFile = '';

	const processRow = (row) =>
	{
		let finalVal = '';

		row.forEach((col, i) =>
		{
			let innerValue = col === null ? '' : col.toString(),
				result = innerValue.replace(/"/g, '""');

			if(col instanceof Date)
			{
				innerValue = col.toLocaleString();
			}

			if(result.search(/("|,|\n)/g) >= 0)
			{
				result = `"${result}"`;
			}

			if(i > 0)
			{
				finalVal += ',';
			}

			finalVal += result;
		});

		return `${finalVal}\n`;
	};

	rows.forEach((row) =>
	{
		csvFile += processRow(row);
	});

	const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });

	if(navigator.msSaveBlob)
	{
		navigator.msSaveBlob(blob, filename);
	}
	else
	{
		const link = document.createElement('a');

		if(link.download !== undefined)
		{
			link.setAttribute('href', URL.createObjectURL(blob));
			link.setAttribute('download', filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
};
