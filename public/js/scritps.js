function generateTableBody(data, id){
	console.log(data);
	let bodyHtml = '<tbody>';
	data.map((row)=> {
		bodyHtml += '<tr>';
		for(let i in row){
			bodyHtml +=`<td>${row[i]}</td>`;	
		}
		bodyHtml += '</tr>';
	});
	bodyHtml += '</tbody>';
	$(id).append(bodyHtml);
	$(id.replace('t', 'h')).show();

}
function generateTableHeader(data, id, cb){
	let header = '<thead class="mdb-color darken-3"> <tr>';
	data.map((value)=>{
		header += `<td>${value}</td>`;
	})
	header += '</tr></thead>';
	$(id).append(header);
	return cb();
}

function generateTable(data, id){
	const header = Object.keys(data[0]);
	generateTableHeader(header, id, ()=> generateTableBody(data, id));	
	
}

$('.btn').click(function () {
		const id = $(this).attr("id");
		$(this).text('Realizando Consulta...');
		$('#'+id.replace('b', 't')).remove('thead');
		$('#'+id.replace('b', 't')).remove('tbody');
		const opt = $(this).attr("id").slice(1);
		let query = null;
		if(opt == 11) query = $('#customQuery').val();
		$.get('find', { opt, query })
			.done((data)=> generateTable(data, '#t'+opt))
			.fail(()=> alert('Query Inválida'))
			.always($(this).text('Realizar Consulta'));
})

$("h3").hide();