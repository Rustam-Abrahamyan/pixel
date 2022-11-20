import Shape, { ShapeStyles } from "./shape";

class Layer {
    name: string;
    shapes: any[];

    constructor(name?: string) {
        this.name = name || "Layer";
        this.shapes = [];
    }

    createShape(styles: ShapeStyles) {
        const shape = new Shape(styles);

        this.shapes.push(shape);

        return shape;
    }
}

export default Layer;
