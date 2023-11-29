// /public/javascripts/logout.js

document.addEventListener('DOMContentLoaded', function () {
    // Function to call the signout API
    async function signout() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/signout', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${getCookie('token')}`, // Include the token from the cookie
          },
        });
  
        const data = await response.json();
  
        // Check if the response is successful
        if (response.ok) {
          console.log('Signed out successfully:', data);
        } else {
          console.error('Error signing out:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Helper function to get a specific cookie value
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  
    // Call the signout function when the page loads
    signout();
  });
  