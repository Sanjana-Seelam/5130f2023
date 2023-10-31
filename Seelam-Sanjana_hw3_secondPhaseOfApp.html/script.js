var modal = document.getElementById("myModal");
var btn = document.getElementById("openBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// script.js

var ctx = document.getElementById('myPieChart').getContext('2d');

var data = {
    labels: ['stocks', 'bonds', 'cash'],
    datasets: [{
        data: [40, 20, 10], // Values representing the size of each slice
        backgroundColor: [
            'pink',
            'violet',
            'blue'
        ]
    }]
};

var options = {
    // You can customize various aspects of the chart, like colors, tooltips, etc. here.
};

var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});
function submitForm() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var suggestion = document.getElementById("suggestion").value;

            var suggestionsDiv = document.getElementById("suggestions");

            if (name && suggestion) {
                var suggestionText = email ? `<strong>${name}</strong> (${email}): ${suggestion}` : `<strong>${name}</strong>: ${suggestion}`;

                var suggestionElement = document.createElement("p");
                suggestionElement.innerHTML = suggestionText;
                suggestionsDiv.appendChild(suggestionElement);

                // Clear input fields after submission
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("suggestion").value = "";
            } else {
                alert("Please enter your name and suggestion!");
            }
        }
if ("geolocation" in navigator) {
          
            navigator.geolocation.getCurrentPosition(function(position) {
                // Get user's latitude and longitude
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

        
                var output = document.getElementById("output");
                output.innerHTML = "Your Latitude: " + latitude + "<br>Your Longitude: " + longitude;

            }, function(error) {
                // Handle errors, if any, when trying to access geolocation
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        output.innerHTML = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        output.innerHTML = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        output.innerHTML = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        output.innerHTML = "An unknown error occurred.";
                        break;
                }
            });
        } else {
            // Geolocation is not supported by the browser
            output.innerHTML = "Geolocation is not supported by your browser.";
        }
        function setCookie() {
            var userInput = prompt("Enter a value to store in the cookie:");
            if (userInput) {
                
                Cookies.set('userInputCookie', userInput, { expires: 3 }); 

                // Display the stored cookie value
                var cookieValue = Cookies.get('userInputCookie');
                document.getElementById('cookieValue').textContent = 'Cookie Value: ' + cookieValue;
            } else {
                alert("Please enter a valid value!");
            }
        }
        