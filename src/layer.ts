import Shape, { IShape } from "./shape";

class Layer {
    name: string;
    shapes: any[];

    constructor(name?: string) {
        this.name = name || "Layer";
        this.shapes = [];
    }

    createShape(type: string = "", options: IShape) {
        const shape = new Shape(type, options);

        this.shapes.push(shape);

        return shape;
    }

    drawShapes(ctx): void {
        for (const shape of this.shapes) {
            shape.draw(ctx);
        }
    }
}

export default Layer;
