/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

var lastDataReceived = null;

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/index.html';
    });
    var interval, isConnected = false;
    function startLoop(){
        interval = window.setInterval(function(){
            getData(lastDataReceived)
        }, 2000);
        isConnected = true;
    }
    function stopLoop(myInterval){
            clearInterval(interval);
        isConnected = false;
    }
    startLoop();

    function updatePoint(location){
        return function(){
            lastDataReceived = location.tst;
            latitude = parseFloat(location.lat)
            longitude = parseFloat(location.lon)
            updatePositionInMap(latitude, longitude, map);    
        }
    }

    function getVehicleData() {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/vehicleData',
            headers: {
                Authorization: authToken
            },
            // data: JSON.stringify({
            //     lastDataReceived: lastDataReceived
            // }),
            contentType: 'application/json',
            success: function receivedData(result){
                console.log('Response received from API: ', result);
                if (!result){
                    console.log("Empry response");
                }
                var vehicles = result.vehicles;
                console.log(vehicles);
                var vehicle = vehicles[0];

                newRow = '<tr><th scope="row"> <div class="media align-items-center"> <a href="#" class="avatar rounded-circle mr-3"> <img alt="Image placeholder" src="assets/img/theme/bootstrap.jpg"> </a> <div class="media-body"> <span class="mb-0 text-sm">'+vehicle.cid+'</span> </div> </div> </th> <td>'+vehicle.PlateNumber+'</td> <td> <span class="badge badge-dot mr-4"> <i class="bg-success"></i>'+ ((vehicle.Status == "Active") ? 'activo' : 'inactivo')+'</span> </td> <td>'+vehicle.Creation_Date+'</td> <td>'+vehicle.City+'</td> <td class="text-right"> <div class="dropdown"> <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v"></i> </a> <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow"> <a class="dropdown-item" href="#">Acción 1</a> <a class="dropdown-item" href="#">Acción 2</a> <a class="dropdown-item" href="#">Acción 3</a> </div> </div> </td> </tr>';

                $('#tableBody').innerHTML(newRow);
                // locations.sort(function(a, b) {
                //     return a.tst < b.tst;
                // });

                // vehicles.forEach(location => {
                //     setTimeout(populateTable(location), 500);
                // });
                
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting new data: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                console.error("Full Error: ", jqXHR);
                alert('An error occured when requesting new data:\n' + jqXHR.responseText);
            }
        });
    }

    function getData() {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/data',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                lastDataReceived: lastDataReceived
            }),
            contentType: 'application/json',
            success: function receivedData(result){
                console.log('Response received from API: ', result);
                if (!result){
                    console.log("Empry response");
                }
                var locations = result.locations;
                locations.sort(function(a, b) {
                    return a.tst < b.tst;
                });

                locations.forEach(location => {
                    setTimeout(updatePoint(location), 500);
                });
                
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting new data: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                console.error("Full Error: ", jqXHR);
                alert('An error occured when requesting new data:\n' + jqXHR.responseText);
            }
        });
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        $('#set-date').click(handleSetDateClick);
        $('#signOut').click(function() {
            WildRydes.signOut();
            alert("Has cerrado sesión.");
            window.location = "index.html";
        });
        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }

        getVehicleData();
    });

    function handlePickupChanged() {
        var requestButton = $('#request');
        requestButton.text('Request Unicorn');
        requestButton.prop('disabled', false);
    }

    function handleRequestClick(event) {
        if(isConnected){
            stopLoop(interval);
            $('#request').text('Connect');
        } else {
            startLoop();
            $('#request').text('Disconnect');
        }
        //var pickupLocation = WildRydes.map.selectedPoint;
        event.preventDefault();
    }

    function handleSetDateClick(event) {
        lastDataReceived = Date.now();
        event.preventDefault();
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
