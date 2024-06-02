document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    document.getElementById('convertButton').disabled = !file;
});

function convertImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');

            const outputImage = document.getElementById('outputImage');
            outputImage.src = pngUrl;
            outputImage.style.display = 'block';

            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = pngUrl;
            downloadLink.style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}