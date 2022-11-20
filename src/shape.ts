import Shapes, { createPath2D } from "./shapes";
import { EventHandlerItem, IEventHandler } from "./events/eventHandler";
import { EventType, Interactive } from "./events/interactive";
import ContextFactory from "./contextProvider";
import Point from "./point";
import { uuid } from "./utils";

type GraphicStyle = string | CanvasGradient | CanvasPattern;
type FillStrokeOrder = "fill-first" | "stroke-first";

export interface ShapeStyles {
    lineCap?: CanvasLineCap;
    lineDashOffset?: number;
    lineDash?: number[];
    lineJoin?: CanvasLineJoin;
    lineWidth?: number;
    miterLimit?: number;
    fill?: GraphicStyle;
    stroke?: GraphicStyle;
    fillStrokeOrder?: FillStrokeOrder;
}

class Shape implements Interactive {
    readonly id: string;
    styles: ShapeStyles;
    stack: any[];
    eventHandler: IEventHandler = new EventHandlerItem();

    constructor(styles) {
        this.id = uuid();
        this.styles = styles;
        this.stack = [];
    }

    draw(ctx) {
        ctx.save();

        const path = new Path2D();

        for (const { type, ...rest } of this.stack) {
            Shapes[type](path, rest);
        }

        if (this.styles.fillStrokeOrder === "stroke-first") {
            this.stroke(ctx, this.styles, path);
            this.fill(ctx, this.styles, path);
        } else {
            this.fill(ctx, this.styles, path);
            this.stroke(ctx, this.styles, path);
        }

        ctx.restore();
    }

    update(styles: ShapeStyles) {
        this.styles = {
            ...this.styles,
            ...styles,
        };
    }

    stroke(ctx: CanvasRenderingContext2D, style: any, path: Path2D) {
        if (!style.stroke) return;

        ctx.strokeStyle = style.stroke;
        ctx.lineWidth = style.lineWidth || 1;
        ctx.lineJoin = style.lineJoin || "bevel";
        ctx.lineDashOffset = style.lineDashOffset || 0;
        ctx.lineCap = style.lineCap || "butt";

        if (style.lineDash) ctx.setLineDash(style.lineDash);

        ctx.stroke(path);
    }

    fill(ctx: CanvasRenderingContext2D, style: any, path: Path2D) {
        if (!style.fill) return;

        ctx.fillStyle = style.fill;
        ctx.fill(path);
    }

    on<K extends keyof EventType>(type: K, listener: (ev: EventType[K]) => void): this {
        this.eventHandler.add(this, type, listener);
        return this;
    }

    off<K extends keyof EventType>(type: K): this {
        this.eventHandler.remove(this, type);
        return this;
    }

    inPath(p: Point): boolean {
        return ContextFactory.context.isPointInPath(this.toPath2D(), p.x, p.y);
    }

    toPath2D(): Path2D {
        return createPath2D(this.stack);
    }

    circle(x: number, y: number, radius: number) {
        this.stack.push({ type: "circle", x, y, radius });
        return this;
    }

    rect(x: number, y: number, w: number, h: number) {
        this.stack.push({ type: "rect", x, y, width: w, height: h });
        return this;
    }
}

export default Shape;
