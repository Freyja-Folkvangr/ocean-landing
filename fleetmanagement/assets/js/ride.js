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
            alert("You have been signed out.");
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

    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
