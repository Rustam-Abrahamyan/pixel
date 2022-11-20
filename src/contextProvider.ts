type Size = {
    width?: number;
    height?: number;
};

class ContextProvider {
    private static canvas: HTMLCanvasElement | null = null;
    private static ctx: CanvasRenderingContext2D | null = null;

    static get context() {
        const { ctx } = this;

        if (ctx) return ctx;

        return ContextProvider.create();
    }

    static create(size: Size = {}): CanvasRenderingContext2D {
        this.canvas = document.createElement("canvas");

        const { width, height } = size;

        if (width) this.canvas.width = width;
        if (height) this.canvas.height = height;

        this.ctx = this.canvas.getContext("2d");

        if (!this.ctx) throw new Error("CanvasRenderingContext2D is unsupported");

        return this.ctx;
    }
}

export default ContextProvider;
