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

//Declaring variables
let last = null;
let closestMarker = null;
let markers = [];
let coord = [0,0];

//Adds the two radio buttons
let command1 = L.control({position: 'topright'});
let command2 = L.control({position: 'topright'});
command1.onAdd = function(map){
	let closest = L.DomUtil.create('div', 'closest');	
	closest.innerHTML = '<form><input id="closest" type="checkbox"/><font size="6"><b>Show Closest Bathroom</b></font></form>';
	return closest;
}
command2.onAdd = function(map){
	let all = L.DomUtil.create('div', 'all');
	all.innerHTML = '<form><input id="all" type="checkbox"/><font size="6"><b>Show All Bathrooms</b></font></form>';
	return all;
}
command1.addTo(map);
command2.addTo(map);

//Event Handler
function handleAll(){
	if(last != null)
		last.checked = false;
	last = this;
	addAllToMap(markers);
}

//Event Handler
function handleClosest(){
	if(last != null)
		last.checked = false;
	last = this;
	addToMap(closestMarker);
}
document.getElementById ("all").addEventListener ("click", handleAll, false);
document.getElementById ("closest").addEventListener ("click", handleClosest, false);



	  
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
		markers.push(addToMap(allTargets[i]));
	}
}

function addToMap(target){
	//Adds location to the map
	
	target.bindPopup();
	let lat = target.Lattitude;
	let long = target.Longitude;
	
	//Example
	let adams = L.marker([lat, long]).addTo(map);
   	adams.bindPopup("<b>" + target.BathroomName"</b><br><b>Rating:</b>" + target.rating);
	return adams;
}


//"main"
checkCompatability();
closestMarker = findClosestBathroom(coord, 1)[0];
markers = findClosestBathroom(coord, 100);
addToMap(null);