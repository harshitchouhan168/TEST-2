document.addEventListener('DOMContentLoaded', () => {
    const matrix = document.getElementById('matrix');
    const matrixWidthInput = document.getElementById('matrixWidth');
    const matrixHeightInput = document.getElementById('matrixHeight');
    const fontSizeInput = document.getElementById('fontSize');
    const colorScrollCheckbox = document.getElementById('colorScroll');
    const fallingPixelsCheckbox = document.getElementById('fallingPixels');
    const imageUploadInput = document.getElementById('imageUpload');
    const inputText = document.getElementById('inputText');
    const updateTextButton = document.getElementById('updateText');
    const scrollingText = document.getElementById('scrollingText');
    const pixelDrawing = document.getElementById('pixelDrawing');

    function updateMatrix() {
        const width = matrixWidthInput.value;
        const height = matrixHeightInput.value;
        const fontSize = fontSizeInput.value;
        
        matrix.style.width = `${width}px`;
        matrix.style.height = `${height}px`;
        scrollingText.style.fontSize = `${fontSize}px`;
        pixelDrawing.style.width = `${width}px`;
        pixelDrawing.style.height = `${height}px`;

        // Update the scrolling animation duration based on the matrix width
        scrollingText.style.animationDuration = `${(width / 50)}s`;
    }

    function initializePixelDrawing() {
        const rows = 12; // Number of rows in the grid
        const cols = 30; // Number of columns in the grid
        pixelDrawing.innerHTML = ''; // Clear previous pixels
        
        for (let i = 0; i < rows * cols; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.addEventListener('click', () => {
                pixel.classList.toggle('active');
            });
            pixelDrawing.appendChild(pixel);
        }
    }

    matrixWidthInput.addEventListener('input', updateMatrix);
    matrixHeightInput.addEventListener('input', updateMatrix);
    fontSizeInput.addEventListener('input', updateMatrix);

    colorScrollCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            scrollingText.classList.add('color-scroll');
        } else {
            scrollingText.classList.remove('color-scroll');
        }
    });

    fallingPixelsCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            const fallingPixels = document.createElement('div');
            fallingPixels.classList.add('falling-pixels');
            matrix.appendChild(fallingPixels);
        } else {
            const fallingPixels = document.querySelector('.falling-pixels');
            if (fallingPixels) {
                fallingPixels.remove();
            }
        }
    });

    imageUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.classList.add('matrix-image');
                matrix.innerHTML = ''; // Clear previous content
                matrix.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    updateTextButton.addEventListener('click', () => {
        scrollingText.textContent = inputText.value || 'Hello, welcome to the pixel matrix!';
    });

    

    // Initialize matrix with default size and font
    updateMatrix();
    initializePixelDrawing();
});
