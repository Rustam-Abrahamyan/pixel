class Viewport {
    private size;
    private coordinates;

    constructor(x: number, y: number, width: number, height: number) {
        this.coordinates = { x, y };
        this.size = { width, height };
    }

    get x() {
        return this.coordinates.e;
    }

    set x(value: number) {
        this.coordinates.x = value;
    }

    get y() {
        return this.coordinates.y;
    }

    set y(value: number) {
        this.coordinates.y = value;
    }

    get width() {
        return this.size.width;
    }

    get height() {
        return this.size.height;
    }
}

export default Viewport;
