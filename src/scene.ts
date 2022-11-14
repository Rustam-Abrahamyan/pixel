import Layer from "./layer";

class Scene {
    private _layers: Layer[];

    constructor() {
        this._layers = [];
    }

    createLayer(name?: string) {
        const result = new Layer(name);

        this._layers.push(result);

        return result;
    }

    removeLayer() {}

    get layers(): Readonly<Layer>[] {
        return this._layers;
    }
}

export default Scene;