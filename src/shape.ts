export interface IShape {
    fill?: string;
    stroke?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
}

class Shape {
    type: string;
    options: IShape;

    constructor(type, options) {
        this.type = type;
        this.options = options;
    }

    draw(ctx) {
        if (this.type === "circle") {
            this.drawCircle(ctx);
        }
    }

    update(options) {
        this.options = {
            ...this.options,
            ...options,
        };
    }

    drawCircle(ctx) {
        const { x, y, radius, stroke, fill } = this.options;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        }

        if (stroke) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }

        ctx.closePath();
    }
}

export default Shape;
