const fs = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class svg{
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

