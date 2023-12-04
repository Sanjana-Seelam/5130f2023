function validatePassword(password) {
  // Validate password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return false;
  }

  // Validate password complexity (mix of upper/lower/digit/symbol)
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  if (!passwordRegex.test(password)) {
    alert("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    return false;
  }

  return true;
}

function validateSignUp() {
  var name = document.getElementById("signup-name").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  var confirmPassword = document.getElementById("signup-confirm-password").value;

  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate password
  if (!validatePassword(password)) {
    return;
  }

  // Confirm password match
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Simulate email verification round trip (in a real app, you'd send a verification email to the user)
  var isEmailVerified = confirm("A verification email has been sent. Please click the link to verify your email.");

  if (isEmailVerified) {
    enable2FA();
  } else {
    alert("Email verification failed");
  }
}

function validateSignIn() {
  var email = document.getElementById("signin-email").value;
  var password = document.getElementById("signin-password").value;

  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate password
  if (!validatePassword(password)) {
    return;
  }

  enable2FA();
}

function validateGuestSignIn() {
  var email = document.getElementById("guest-email").value;
  var password = document.getElementById("guest-password").value;

  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate password
  if (!validatePassword(password)) {
    return;
  }

  enable2FA();
}

function enable2FA() {
  // Simulate sending 2FA code via text (in a real app, you'd send the code to the user's phone)
  var code = prompt("Enter the 2FA code received via text: 123456");

  // Validate the entered code (in a real app, you'd compare it with the code generated on the server)
  if (code === "123456") {
    alert("2FA verification successful. Successfully logged in!");
    enableGeolocation();
  } else {
    alert("Invalid 2FA code. Login failed.");
  }
}
function enableGeolocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Use the latitude and longitude to fetch weather information (you may need an API key)
      fetchWeatherInfo(latitude, longitude);

      // Call function to display local preferences
      displayLocalPreferences();
    });
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function fetchWeatherInfo(latitude, longitude) {
  // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
  var apiKey = 'YOUR_API_KEY';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var weatherDescription = data.weather[0].description;
      var temperature = data.main.temp;

      // Display weather information in a pop-up box
      alert(`Current Weather: ${weatherDescription}\nTemperature: ${temperature}°C`);
    })
    .catch(error => {
      console.error('Error fetching weather information', error);
    });
}

function displayLocalPreferences() {
  // Simulate obtaining local preferences for Lowell, MA (replace with actual data or an API call)
  var localLanguage = "English";
  var localCurrency = "USD";
  var otherFacts = "Lowell is known for its historic textile mills.";

  // Display the obtained local preferences
  alert(`Local Language: ${localLanguage}\nLocal Currency: ${localCurrency}\nOther Facts: ${otherFacts}`);
}



document.addEventListener('DOMContentLoaded', function () {
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Function to create/update user profile in Firestore
  async function updateUserProfile(user) {
    const userRef = db.collection('users').doc(user.uid);

    // Check if the user document already exists
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      // If the user document doesn't exist, create a new one
      await userRef.set({
        name: user.displayName,
        email: user.email,
        // Add more fields as needed
      });

      console.log('User profile updated successfully!');
    }
  }

  // Example of updating user profile after login
  auth.onAuthStateChanged((user) => {
    if (user) {
      updateUserProfile(user);
    }
  });

  // Example of updating user profile on button click
  const updateProfileButton = document.getElementById('signup');

  updateProfileButton.addEventListener('click', function () {
    const user = firebase.auth().currentUser;

    if (user) {
      updateUserProfile(user);
    } else {
      console.log('User not authenticated.');
    }
  });
});

