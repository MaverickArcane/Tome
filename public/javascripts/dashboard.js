// public/javascripts/dashboard.js
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-button');
  
    logoutButton.addEventListener('click', function () {
      // Get the token from the cookie
      const token = getCookie('token');
  
      // Perform the logout API call when the logout button is clicked
      fetch('http://localhost:3000/api/v1/signout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${token}`, // Send only the token cookie
        },
      })
        .then(response => {
          if (response.ok) {
            // Redirect to the logout page upon successful logout
            window.location.href = '/logout';
          } else {
            // Handle non-JSON responses more gracefully
            console.error('Logout failed:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    });
  
    // Function to retrieve a specific cookie value by name
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  });
  