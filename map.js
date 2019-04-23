// initialize the map
let map = L.map('testmap').setView([38.830971, -77.307986], 15);

// load a tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    minZoom: 2
}).addTo(map);

 
let coord = [0,0];
checkCompatability();
addToMap(null);
	  
//Call this to set coord variable to current location and check browser compatability	  
function checkCompatability(){
	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(getLocation);
	else
		alert("Location services not supported by this browser");
}
	  
//Sets the coord variable. Don't call this directly
function getLocation(position){
	coord[0] = position.coords.latitude;
	coord[1] = position.coords.longitude;
	map.setView(coord, 16);
}

function addAllToMap(allTargets){
	for(let i = 0; i < allTargets.length; i++){
		addToMap(allTargets[i]);
	}
}

function addToMap(target){
	//Adds location to the map
	
	//Example
	let adams = L.marker([38.829715, -77.301219]).addTo(map);
   	adams.bindPopup("<b>Adam's Bathroom</b><br><b>Rating:</b> 2/10 <br><b>Review:</b> Dirty freshman dorm bathroom. I recommend going anywhere else if possible.");
}