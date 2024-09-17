const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const scrollTextInput = document.getElementById('scrollTextInput');
const startScroll = document.getElementById('startScroll');
const stopScroll = document.getElementById('stopScroll');
const matrixWidthInput = document.getElementById('matrixWidthInput');
const matrixHeightInput = document.getElementById('matrixHeightInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const imageUpload = document.getElementById('imageUpload');
const stopColorScrollbtn = document.getElementById('stopColorScrollbtn');
const stopFallingPixelsBtn = document.getElementById('stopFallingPixelsBtn');


let matrixWidth = parseInt(matrixWidthInput.value);
let matrixHeight = parseInt(matrixHeightInput.value);
let fontSize = parseInt(fontSizeInput.value);
let scrollSpeed = 2;

let pixels = [];
let falling = false;
let intervalid;

canvas.width = matrixWidth * fontSize;
canvas.height = matrixHeight * fontSize;

let scrollText = '';
let scrolling = false;
let scrollPos = canvas.width;

// Example bitmap for letters
const alphabetBitmap = {
    'A': [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
    ],
    'B': [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0],
    ],
    'C': [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ],
    'D': [
            [1, 1, 1, 1, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 0],
        ],
        'E': [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
        ],
        'F': [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
        ],
        'G': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        'H': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
        ],
        'I': [
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
        ],
        'J': [
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
        ],
        'K': [
            [1, 0, 0, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1],
        ],
        'L': [
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
        ],
        'M': [
            [1, 0, 0, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
        ],
        'N': [
            [1, 0, 0, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 0, 1, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
        ],
        'O': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        'P': [
            [1, 1, 1, 1, 0],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
        ],
        'Q': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        'R': [
            [1, 1, 1, 1, 0],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1],
        ],
        'S': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        'T': [
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
        ],
        'U': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [0, 1, 1, 1, 0],
        ],
        'V': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 1, 1],
            [0, 1, 1, 0, 0],
        ],
        'W': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1],
        ],
        'X': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1],
        ],
        'Y': [
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1],
        ],
        'Z': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],

    
    // Add remaining letters
};

// Converts text to pixel grid
function textToPixelArray(text) {
    const pixelArray = [];
    for (let char of text) {
        const upperChar = char.toUpperCase();
        if (alphabetBitmap[upperChar]) {
            pixelArray.push(alphabetBitmap[upperChar]);
        } else {
            pixelArray.push([]); // Empty array for undefined characters
        }
    }
    return pixelArray;
}

// Draw the grid
function drawMatrix() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    for (let i = 0; i <= matrixWidth; i++) {
        ctx.beginPath();
        ctx.moveTo(i * fontSize, 0);
        ctx.lineTo(i * fontSize, canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i <= matrixHeight; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * fontSize);
        ctx.lineTo(canvas.width, i * fontSize);
        ctx.stroke();
    }
}

// Draw the text as pixels in the matrix
function drawTextPixelMatrix(textPixelArray) {
    let xPos = scrollPos;
    const yPos = 0; 

    for (let i = 0; i < textPixelArray.length; i++) {
        const letterMatrix = textPixelArray[i];
        if (!letterMatrix || !letterMatrix.length) {
            // Skip if letterMatrix is undefined or empty
            xPos += (5 + 1) * fontSize; // Adjust spacing if needed
            continue;
        }
        for (let y = 0; y < letterMatrix.length; y++) {
            for (let x = 0; x < letterMatrix[y].length; x++) {
                if (letterMatrix[y][x] === 1) {
                    ctx.fillStyle = '#FF4500';
                    ctx.fillRect(xPos + (x * fontSize), yPos + (y * fontSize), fontSize, fontSize);
                }
            }
        }
        xPos += (letterMatrix[0].length + 1) * fontSize;
    }
}

// Draw scrolling text
function drawScrollingText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const textPixelArray = textToPixelArray(scrollText);
    drawTextPixelMatrix(textPixelArray);
    drawMatrix();

    scrollPos -= scrollSpeed;
    if (scrollPos < -textPixelArray.reduce((max, matrix) => Math.max(max, (matrix[0] ? matrix[0].length : 0)), 0) * fontSize) {
        scrollPos = canvas.width;
    }
}

function animate() {
    if (scrolling) {
        drawScrollingText();
    } else {
        drawMatrix();
    }
    requestAnimationFrame(animate);
}

// Event listeners for dynamic changes
matrixWidthInput.addEventListener('change', () => {
    matrixWidth = parseInt(matrixWidthInput.value);
    canvas.width = matrixWidth * fontSize;
});

matrixHeightInput.addEventListener('change', () => {
    matrixHeight = parseInt(matrixHeightInput.value);
    canvas.height = matrixHeight * fontSize;
});

fontSizeInput.addEventListener('change', () => {
    fontSize = parseInt(fontSizeInput.value);
    canvas.width = matrixWidth * fontSize;
    canvas.height = matrixHeight * fontSize;
});

startScroll.addEventListener('click', () => {
    scrollText = scrollTextInput.value;
    scrollPos = canvas.width;
    scrolling = true;
});

stopScroll.addEventListener('click', () => {
    scrolling = false;
    drawMatrix();
});

// Initialize pixels
function initPixels() {
    pixels = [];
    for (let x = 0; x < matrixWidth; x++) {
      pixels[x] = [];
      for (let y = 0; y < matrixHeight; y++) {
        pixels[x][y] = Math.random() < 0.05 ? getRandomColor() : null;
      }
    }
  }

//    Generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Draw pixels
function drawPixels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < matrixWidth; x++) {
      for (let y = 0; y < matrixHeight; y++) {
        if (pixels[x][y]) {
          ctx.fillStyle = pixels[x][y];
          ctx.fillRect(x * fontSize, y * fontSize, fontSize, fontSize);
        }
      }
    }
  }
  
  // Falling pixels animation
function fallingPixels() {
    falling = true;
    initPixels();
    setInterval(() => {
      for (let x = 0; x < matrixWidth; x++) {
        pixels[x].unshift(null);  // Add an empty space at the top
        if (pixels[x].length > matrixHeight) {
          pixels[x].pop();  // Remove the last pixel when it goes out of canvas
        }
        if (Math.random() < 0.05) {
          pixels[x][0] = getRandomColor();  // Occasionally add a colored pixel at the top
        }
      }
      drawPixels();
    }, 200);
  }
  
  // Color scroll animation
  function colorScroll() {
    clearInterval(intervalid);  // Stop any previous animation
    falling = false;

    let hue = 0;
    intervalid = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Create a gradient that moves horizontally
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 100%, 50%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        hue += 2;  // Increment hue for color shifting effect
        if (hue >= 360) hue = 0;  // Loop back the hue value
    }, 100);
}
  
  
  // Button event listeners
document.getElementById('fallingPixelsBtn').addEventListener('click', () => {
    if (!falling) fallingPixels();
  });
  

  document.getElementById('colorScrollBtn').addEventListener('click', colorScroll);


// Start the animation loop
animate();
