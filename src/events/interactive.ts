import Point from "../point";
import { FocusEventDecorator, KeyboardEventDecorator, MouseEventDecorator, DragEventDecorator } from "./decorators";
import MouseCursorTypes from "./mouseCursorTypes";

export interface InteractiveEvent<TEvent> {
    event: TEvent;
    cursor: MouseCursorTypes;
    target: any;
}

export interface EventType {
    click: InteractiveEvent<MouseEventDecorator>;
    dblclick: InteractiveEvent<MouseEventDecorator>;
    contextmenu: InteractiveEvent<MouseEventDecorator>;
    hover: InteractiveEvent<MouseEventDecorator>;
    leave: InteractiveEvent<MouseEventDecorator>;
    mousemove: InteractiveEvent<MouseEventDecorator>;
    mousedown: InteractiveEvent<MouseEventDecorator>;
    mouseup: InteractiveEvent<MouseEventDecorator>;
    keyup: InteractiveEvent<KeyboardEventDecorator>;
    keydown: InteractiveEvent<KeyboardEventDecorator>;
    wheel: InteractiveEvent<MouseEventDecorator>;
    focus: InteractiveEvent<FocusEventDecorator>;
    blur: InteractiveEvent<FocusEventDecorator>;
    dragover: InteractiveEvent<DragEventDecorator>;
    dragleave: InteractiveEvent<DragEventDecorator>;
    drop: InteractiveEvent<DragEventDecorator>;
}

export interface Interactive {
    on<K extends keyof EventType>(type: K, listener: (ev: EventType[K]) => void): this | Interactive;
    off<K extends keyof EventType>(type: K): this | Interactive;
    inPath(p: Point): boolean;
    id: string;
}
