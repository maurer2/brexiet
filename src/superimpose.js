import { createCanvas, loadImage } from 'canvas';
import terminalImage from 'terminal-image';

const canvas = createCanvas(640, 360);
const context = canvas.getContext('2d');

// font styles
context.font = '148px "Arial"';
context.fillStyle = 'red';
context.fillText('Rexie Cat', 320, 180);

loadImage('./dump/image.jpg')
  .then((background) => {
    context.drawImage(background, 0, 0, 640, 480);

    const canvasAsBuffer = canvas.toBuffer();
    const consoleImage = terminalImage.buffer(canvasAsBuffer);

    consoleImage
      .then((image) => {
        console.log(image);
      });
  });
