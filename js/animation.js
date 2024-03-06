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




  // const canvas = document.getElementById('interactiveCanvas');
  // const ctx = canvas.getContext('2d');

  // // Set canvas size to fill the window
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  // // Store previous mouse position
  // let mouseX = 0;
  // let mouseY = 0;

  // // Listen for mouse movement
  // document.addEventListener('mousemove', function(event) {
  //     mouseX = event.clientX;
  //     mouseY = event.clientY;
  // });

  // // Store multiple previous mouse positions
  // const prevMousePositions = [];
  // const maxTrailLength = 50; // Adjust the maximum number of stored positions as needed

  // // Function to draw on the canvas
  // function draw() {
  //     // Draw lines connecting multiple previous mouse positions
  //     for (let i = 1; i < prevMousePositions.length; i++) {
  //         ctx.beginPath();
  //         ctx.moveTo(prevMousePositions[i - 1].x, prevMousePositions[i - 1].y);
  //         ctx.lineTo(prevMousePositions[i].x, prevMousePositions[i].y);
  //         ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
  //         ctx.lineWidth = 8; // Adjust line width as needed
  //         ctx.stroke();
  //     }

  //     // Update previous mouse positions
  //     prevMousePositions.push({ x: mouseX, y: mouseY });

  //     // Limit the number of stored positions to control trail length
  //     if (prevMousePositions.length > maxTrailLength) {
  //         prevMousePositions.shift(); // Remove the oldest position
  //     }
  // }

  // // Function to update the canvas
  // function update() {
  //     // // Clear the canvas
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     // Draw the trail
  //     draw();

  //     // Request the next animation frame
  //     requestAnimationFrame(update);
  // }

  // setTimeout(function() {
  //   update();
  // }, 3000);

});