$(function(){
	var regionToAccLocation = {};
	var regionToUserLocation = {};

	regionToAccLocation["South India"] = [12.89, 79.18]
	regionToAccLocation["West Europe"] = [51.95, 5.09]
	regionToAccLocation["Japan West"] = [56.94, 161]
	regionToAccLocation["South Central US"] = [29.53, -98.73]
	regionToAccLocation["East US"] = [45.95, -68.55]
	regionToAccLocation["West US"] = [47.27, -127.51]
	regionToAccLocation["Brazil South"] = [-22.26, -48.16]
	regionToAccLocation["SouthEast Asia"] = [-0.79, 101.58]
	regionToAccLocation["Australia East"] = [-29.99, 151.66]


	regionToUserLocation["South India"] = [10.40, 78.30]
	regionToUserLocation["West Europe"] = [46.67, 4.57]
	regionToUserLocation["Japan West"] = [52.26, 156]
	regionToUserLocation["South Central US"] = [35.31, -93.29]
	regionToUserLocation["East US"] = [42.81, -75.09]
	regionToUserLocation["West US"] = [42.29, -120.58]
	regionToUserLocation["Brazil South"] = [-6.31, -43.59]
	regionToUserLocation["SouthEast Asia"] = [4.74,101.58]
	regionToUserLocation["Australia East"] = [-32.69, 118.22]
	
	  $.get('/regions', function(regionsResponse) {
		  $.get('/accregions', function(accRegionsResponse) {
			  var mapmarkers = [];
			  var vals = [];
			  for(var id=0;id<regionsResponse.length;id++)
			  {
				  var region = regionsResponse[id].region;
				  
				  mapmarkers.push({latLng: regionToUserLocation[region], name: region, type: "User"});
				  vals.push('User');
			  }
			  
			 
			  for(var id1=0;id1<accRegionsResponse[0].regions.length;id1++)
			  {
				  var accregion = accRegionsResponse[0].regions[id1];
				  
				  mapmarkers.push({latLng: regionToAccLocation[accregion], name: accregion, type: "Acc"});
				  vals.push('Acc');
			  }
			  
		      
			  $('#worldmap').vectorMap({
					map: 'world_mill',
					scaleColors: ['#C8EEFF', '#0071A4'],
					normalizeFunction: 'polynomial',
					hoverOpacity: 0.7,
					hoverColor: false,
					markerStyle: {
					  initial: {
						fill: '#F8E23B',
						stroke: '#383f47'
					  }
					},
					backgroundColor: '#383f47',
					markers: mapmarkers.map(function(h) {
						return {
							name: h.name,
							latLng: h.latLng
						}
					}),
					series: {
						markers: [{
							scale: {
								'Acc': '#FF69B4',
								'User': '#4169E1'
							  },
							attribute: 'fill',							  
							values: vals,
							legend: {
							  horizontal: true,
							  title: 'Mongo Geo Demo',
							  labelRender: function(v){
								return {
								  Acc: 'DB',
								  User: 'User app'
								}[v];
							  }
							}
						}]
					}
				});
			  
		  }, 'json');
	  }, 'json');
      
});