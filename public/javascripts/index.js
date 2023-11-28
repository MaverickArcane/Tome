document.addEventListener('DOMContentLoaded', function () {
    const signinLink = document.getElementById('signin-link');
    const dashboardLink = document.getElementById('dashboard-link');
  
    signinLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/signin';
    });
  
    dashboardLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/dashboard';
    });
  });
  