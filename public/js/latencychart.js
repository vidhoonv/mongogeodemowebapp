google.load('visualization', '1', {'packages':['corechart', 'bar']});
google.setOnLoadCallback(drawChart);

function drawChart() {
	setInterval(drawChart, (30 * 1000));
    $.get('/regions', function(response) {
		
        for(var idx = 0; idx < response.length; ++idx) {
            var item = response[idx];
			var region = item.region;
			
			//for each region draw chart
			$.get('/regionlatencydata', {regionName: region},function(resp)
			{
				var chartData = [];
				var rval;
				for(var id = 0; id < resp.length; ++id) {
					var item = resp[id];
					rval = item.region;
					chartData.push([id+1, item.writeLatency, item.readLatency]);
				}
				//document.write(chartData);
				
				if(chartData.length > 0)
				{
					// Create the data table.
					var data = new google.visualization.DataTable();
					data.addColumn('number', 'Time');
					data.addColumn('number', 'Write Latency');
					data.addColumn('number', 'Read Latency');
					data.addRows(chartData);

					var options = {
						title: 'Mongo geo latencies as experienced from: '+ rval
					};

					//create and draw the chart from DIV
					var chart = new google.visualization.LineChart(document.getElementById(rval));
					chart.draw(data, options);
				}
				
				
			}, 'json');
			
        }
		
    }, 'json');
}