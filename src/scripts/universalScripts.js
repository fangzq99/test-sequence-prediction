function setupEventListeners() {
  var menuButton = document.querySelector('.menu-button');
  var dropdownMenu = document.querySelector('.dropdown-menu');

  function handleClick() {
    console.log('Button clicked!');
  }

  menuButton.addEventListener('mouseover', function () {
    menuButton.classList.add('hover');
  });

  menuButton.addEventListener('mouseover', function () {
    menuButton.classList.remove('hover');
  });

  dropdownMenu.addEventListener('mouseover', function () {
    menuButton.classList.add('hover');
  });

  dropdownMenu.addEventListener('mouseout', function () {
    menuButton.classList.remove('hover');
  });

  menuButton.addEventListener('click', handleClick);
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
