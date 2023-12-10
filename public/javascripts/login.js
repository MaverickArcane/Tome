// public/javascripts/login.js
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    
  
    loginButton.addEventListener('click', async function () {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        // Make the authentication API call
        const response = await fetch('http://localhost:3000/api/v1/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
  
        // Check if the API call was successful
        if (response.ok) {
          const data = await response.json();
  
          // Set the token in the cookie and redirect to the dashboard
          document.cookie = `token=${data.token}; path=/`;
          window.location.href = '/dashboard';
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData.message);
          // Handle login failure (e.g., show an error message)

          // Displays the error message on HTML side
          $('#errorMessage').text(errorData.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle login error (e.g., show an error message)
        $('#errorMessage').text('Username or password is incorrect, please try again.')
      }
    });
  });
  