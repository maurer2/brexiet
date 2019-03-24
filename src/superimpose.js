import { createCanvas, loadImage } from 'canvas';
// import terminalImage from 'terminal-image';
import fs from 'fs-extra';

const canvas = createCanvas(640, 360);
const context = canvas.getContext('2d');

// output
const newFile = fs.createWriteStream('./dist/test.jpeg');

loadImage('./dump/image.jpg')
  .then((background) => {
    context.drawImage(background, 0, 0, 640, 480);

    // font stuff
    context.font = '48px "Arial"';
    context.fillStyle = 'black';
    // context.textAlign = 'center';
    context.fillText('Rexie Cat', 50, 50);

    const canvasAsBuffer = canvas.toBuffer();

    newFile.write(canvasAsBuffer);

    /*
    const consoleImage = terminalImage.buffer(canvasAsBuffer);

    consoleImage
      .then((image) => {
        console.log(image);
      });
    */
  });
