const fs = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeEl = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x ="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

const questions = [
    {
        type: "input",
        name: "logo-name",
        message: "Enter your logo name",
    },
    {
        type: "input",
        name: "text-color",
        message: "What would you like your text color to be",
    },
    {
        type: "input",
        name: "shape-color",
        message: "what would you like your shape color to be",
    },
    {
        type: "list",
        name: "shape",
        message: "Which shape would you like for your logo",
        choices: ["Circle", "Square", "Triangle"],
    },
];

function writeToFile(fileName, data) {
    console.log("writing [" + data + "] to file [" + fileName + "]")
    fileSystem.writefile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("logo.svg generated!");
    });
}

async function init () {
    console.log("starting writing");
    var svgString = "";
    var svg_file = "logo.svg";

    const answers = await inquirer.prompt(questions);

    var user_text = "";
    if (answers.text.length > 0 && answers.text.length <4) {
        user_text = answers.text;
    } else {
        console.log("Please only enter 1-3 characters")
        return;
    }
    console.log("User text: [" + user_text + "]");

    user_font_color = answers["text-color"];
    console.log("User font color: [" + user_font_color + "]");

    user_shape_color = answers.shape;
    console.log("User shape color: [" + user_shape_color + "]");

    user_shape_type = answers["shape"];
    console.log("User's shape = [" + user_shape_type + "]");

    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
        console.log("User selected Square shape");
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
        console.log("User selected Circle shape");
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle();
        console.log("User selected triangle shape");
    } else {
        console.log("Invalid shape!");
    }
    user_shape.setcolor(user_shape_color);

    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    console.log("Displaying shape: \n\n" + svgString);

    console.log("shape generation complete!");
    console.log("Writing shape to file...");
    writeToFile(svg_file, svgString);
}
init()