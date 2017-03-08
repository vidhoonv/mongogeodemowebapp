$(function(){
	var regionToAccLocation = {};
	var regionToUserLocation = {};

	//acc locations
	regionToAccLocation["South India"] = [12.89, 79.18]
	regionToAccLocation["West India"] = [21.511851, 70.664063]
	regionToAccLocation["Central India"] = [21.920115, 77.783203]
	
	regionToAccLocation["West Europe"] = [51.95, 5.09]
	regionToAccLocation["North Europe"] = [53.142367, -7.692054]
	regionToAccLocation["UK West"] = [51.481581, -3.17909]
	regionToAccLocation["UK South"] = [51.507351, -0.127758]
	
	regionToAccLocation["Japan West"] = [34.693738, 135.502165]
	regionToAccLocation["Japan East"] = [35.895081, 139.630732]
	
	regionToAccLocation["South Central US"] = [31.968599, -99.901813]
	regionToAccLocation["East US"] = [37.431573, -78.656894]
	regionToAccLocation["West US"] = [36.778261, -119.417932]
	regionToAccLocation["East US 2"] = [37.210644, -81.035156]
	regionToAccLocation["West US 2"] = [37.185485, -121.245117]
	regionToAccLocation["Central US"] = [41.878003, -93.097702]
	regionToAccLocation["West Central US"] = [45.514046, -97.382813]	
	regionToAccLocation["North Central US"] = [40.633125, -89.398528]
	
	regionToAccLocation["Brazil South"] = [-23.543179, -46.629185]
	
	regionToAccLocation["SouthEast Asia"] = [1.352083, 103.819836]
	regionToAccLocation["East Asia"] = [22.396428, 114.109497]
	
	regionToAccLocation["Australia East"] = [-31.253218, 146.921099]
    regionToAccLocation["Australia SouthEast"] = [-35.623815, 139.042969]
	
	
	regionToAccLocation["Canada Central"] = [43.653226, -79.383184]
	regionToAccLocation["Canada East"] = [46.813878, -71.207981]
	
	regionToAccLocation["Korea Central"] = [37.566535, 126.977969]
    regionToAccLocation["Korea South"] = [35.179554, 129.075642]
	
	//user locations
	regionToUserLocation["South India"] = [12.869962, 79.958496]
	regionToUserLocation["West India"] = [25.381254, 70.839844]
	regionToUserLocation["Central India"] = [25.619239, 78.662109]
	
	regionToUserLocation["West Europe"] = [52.132633, 5.291266]
	regionToUserLocation["North Europe"] = [51.967539, -9.602051)]
	regionToUserLocation["UK West"] = [50.421644, -4.174805]
	regionToUserLocation["UK South"] = [51.989743, 1.087646]
	
	regionToUserLocation["Japan West"] = [33.127201, 133.022461]
	regionToUserLocation["Japan East"] = [38.710161, 141.372070]
	
	regionToUserLocation["South Central US"] = [30.267153, -97.743061]
	regionToUserLocation["East US"] = [37.360334, -76.596680]
	regionToUserLocation["West US"] = [41.358257, -122.695313]
	regionToUserLocation["East US 2"] = [36.517362, -80.288086]
	regionToUserLocation["West US 2"] = [33.190432, -116.718750]
	regionToUserLocation["Central US"] = [42.405207, -100.283203]
	regionToUserLocation["West Central US"] = [43.626135, -108.457031]	
	regionToUserLocation["North Central US"] = [37.882441, -88.505859]
	
	regionToUserLocation["Brazil South"] = [-13.264006, -55.898438]
	
	regionToUserLocation["SouthEast Asia"] = [1.352083, 103.819836]
	regionToUserLocation["East Asia"] = [23.621878, 121.113281)]
	
	regionToUserLocation["Australia East"] = [-35.786627, 148.535156]
    regionToUserLocation["Australia SouthEast"] = [-37.471308, 144.785153]
	
	
	regionToUserLocation["Canada Central"] = [46.481373, -75.058594]
	regionToUserLocation["Canada East"] = [49.774170, -61.171875]
	
	regionToUserLocation["Korea Central"] = [38.140767, 128.353271]
    regionToUserLocation["Korea South"] = [34.663570, 126.771240]
	
	
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