document.addEventListener('DOMContentLoaded', function() {
  var logo = document.getElementById('logo');
  var one = document.getElementById('one');
  var three = document.getElementById('three');

  setTimeout(function() {
    logo.style.opacity = 1;
    logo.style.transform = 'scale(1)';
  }, 100);

  setTimeout(function() {
    one.style.opacity = 1;
  }, 1500);

  setTimeout(function() {
    three.style.opacity = 1;
  }, 1750);

});