import MouseCursorTypes from "./mouseCursorTypes";
import { Interactive } from "./interactive";

class InteractiveEvent<TEvent> {
    private canvas: HTMLCanvasElement;
    event: TEvent;
    target: Interactive;

    constructor(event: TEvent, target: Interactive, canvas: HTMLCanvasElement) {
        this.event = event;
        this.target = target;
        this.canvas = canvas;
    }

    get cursor(): MouseCursorTypes {
        return this.canvas.style.cursor as MouseCursorTypes;
    }

    set cursor(value: MouseCursorTypes) {
        this.canvas.style.cursor = value;
    }
}

export default InteractiveEvent;