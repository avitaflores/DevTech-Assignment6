/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');


console.log("\nHi, welcome to my QR Code Generator!");

//Use the inquirer npm package to get user input.
const questions = [
    {
        type: 'input',
        name: 'urlInput',
        message: 'What URL do you want to make a code for?',
    
    }
]
inquirer.prompt(questions).then((answers) => {
    console.log("Generating QR code...\n");

    // Save the user input URL to a text file
    fs.writeFile('user_input.txt', answers.urlInput, (err) => {
        if (err) {
            console.error("Error saving user input:", err);
            return;
        }
        console.log("User input saved to user_input.txt");
    });


    //Use the qr-image npm package to turn the user  URL into a QR code image.
    const qrImg = qr.image(answers.urlInput);
    qrImg.pipe(fs.createWriteStream('qrcode.png'));
    console.log("QR Code generated successfully!");
  })


