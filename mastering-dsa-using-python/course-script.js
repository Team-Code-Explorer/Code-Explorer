// JavaScript to toggle menu
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const dropdown = document.querySelector('.dropdowna');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        dropdown.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            menuToggle.textContent = 'Close';
        } else {
            menuToggle.textContent = 'Menu';
        }
    });
});