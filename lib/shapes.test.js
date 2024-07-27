const {Circle, Square, Triangle} = require("./shapes")

describe('Circle', () => {
    const shape = new Circle();
    var color = ('green')
    shape.setcolor(color);
    expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`);
});
