var map;
var currentMarker;
var currentDotMarker;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: -33.414835, lng: -70.5985567 },
    mapTypeId: 'roadmap'
  });

  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  poly.setMap(map);
}

function addPolylineLatLng(latitude, longitude) {
  addPolylinePoint(new google.maps.LatLng(latitude, longitude))
}
function addPolylinePoint(point) {
  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(point);

  // Add a new marker at the new plotted point on the polyline.

  if (currentDotMarker != null) {
    currentDotMarker.setMap(null);
  }  
  currentDotMarker = drawDot(point, path, map);
}

function drawDot(point, path, map) {
  var dot = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 0,
    fillColor: '#FF0000',
    fillOpacity: 1.0,
    map: map,
    center: point,
    radius: 5,
    title: '#' + path.getLength()
  });
  return dot;
}

function drawCar(lat, lon, map) {
  var contentString = 
            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Vehículo: GW XZ 14</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Ciudad</b>: Santiago ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

  var image = {
    url: 'https://www.entelocean.com/fleetmanagement/assets/img/icons/car.png',
    // This marker is 20 pixels wide by 32 pixels high.
    //size: new google.maps.Size(200, 200),
    scaledSize: new google.maps.Size(20, 20),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(10, 10)
  };
  
  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map,
    icon: image
  });
  marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
  return marker;
}


function updatePositionInMap(lat, lon, map) {
  addPolylineLatLng(lat, lon);
  if (currentMarker != null) {
    currentMarker.setMap(null);
  }
  currentMarker = drawCar(lat, lon, map);
}

