import Layer from "./layer";
import Scene from "./scene";
import Viewport from "./viewport";
import { requestAnimationFrame } from "./animation";

class Renderer {
    readonly ctx: CanvasRenderingContext2D;
    readonly viewport: Viewport;

    onFrameChanged: (() => void) | null = null;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = true;
        this.viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    render(scene: Scene): void {
        for (const layer of scene.layers) this.drawLayer(layer);

        requestAnimationFrame(() => {
            this.clear();
            this.render(scene);
            this.onFrameChanged();
        });
    }

    clear(): void {
        const { width, height } = this.viewport;
        this.ctx.clearRect(0, 0, width, height);
    }

    protected getCanvas(): HTMLCanvasElement {
        return this.ctx.canvas;
    }

    protected drawLayer(layer: Readonly<Layer>) {
        layer.drawShapes(this.ctx);
    }
}

export default Renderer;
