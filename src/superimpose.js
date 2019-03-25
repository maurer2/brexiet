import { createCanvas, loadImage } from 'canvas';
// import terminalImage from 'terminal-image';
import fs from 'fs-extra';

const canvas = createCanvas(1280, 800);
const context = canvas.getContext('2d');
const { width, height } = canvas;

// output
const newFile = fs.createWriteStream('./dist/image.jpeg');
const watermark = '@rexiecat';

// font settings
context.font = '48px "Arial"';
context.fillStyle = 'black';

const textInfo = context.measureText('Rexie Cat');
const padding = 40;
const textWidth = textInfo.width + padding;
const textHeight = 48 + padding;

loadImage('./dump/dummy.jpg')
  .then((background) => {
    // background image
    context.drawImage(background, 0, 0, width, height);

    // background text
    context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    context.fillRect(width - textWidth, height - textHeight, textWidth, textHeight);

    // text
    context.fillStyle = 'white';
    context.fillText(
      watermark,
      width - (textWidth - padding / 3),
      height - (textHeight - (padding * 1.5)),
    );

    newFile.write(canvas.toBuffer());
  });
