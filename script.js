const canvas = document.getElementById("maskCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load mask image (your scary mask)
const maskImg = new Image();
maskImg.src = "mask.png"; // replace with correct path

let masks = [];

// Create floating masks
for (let i = 0; i < 15; i++) {
  masks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    size: 60 + Math.random() * 40
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  masks.forEach(mask => {
    ctx.drawImage(maskImg, mask.x, mask.y, mask.size, mask.size);

    mask.x += mask.dx;
    mask.y += mask.dy;

    // Bounce off edges
    if (mask.x < 0 || mask.x + mask.size > canvas.width) mask.dx *= -1;
    if (mask.y < 0 || mask.y + mask.size > canvas.height) mask.dy *= -1;
  });

  requestAnimationFrame(animate);
}

maskImg.onload = animate;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
