import { EventHandlers, ListenerType } from "./eventHandler";
import InteractiveEvent from "./interactiveEvent";
import Point from "../point";
import { EventType } from "./interactive";
import ActionSpec from "./actionSpec";
import { MouseEventDecorator, KeyboardEventDecorator, DragEventDecorator } from "./decorators";

class HandlerResolver {
    private handlers: EventHandlers;
    private element: HTMLCanvasElement;
    private hovered: ActionSpec;
    private pressed: ActionSpec;
    private dragged: ActionSpec;

    constructor(handlers: EventHandlers, canvas: HTMLCanvasElement) {
        this.handlers = handlers;
        this.element = canvas;
        this.hovered = new ActionSpec();
        this.pressed = new ActionSpec();
        this.dragged = new ActionSpec();
    }

    onclick(e: MouseEvent) {
        this.setHandler("click", (p) => {
            if (!this.hit(p, e)) return true;
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    ondblclick(e: MouseEvent): any {
        this.setHandler("dblclick", (p) => {
            if (!this.hit(p, e)) return true;
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    oncontextmenu(e: MouseEvent): any {
        this.setHandler("contextmenu", (p) => {
            e.preventDefault();
            if (!this.hit(p, e)) return true;
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onmousemove(e: MouseEvent) {
        this.setHandler("leave", (p) => {
            if (this.hit(p, e)) return true;
            const id = p.interactive.id;
            if (!this.hovered.has(id)) return true;
            this.hovered.clear(id);
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });

        this.setHandler("hover", (p) => {
            if (!this.hit(p, e)) return true;
            const id = p.interactive.id;
            if (this.hovered.has(id)) {
                return !this.hovered.isStopPropagation(id);
            }

            this.hovered.set(id);
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            if (decorator.isStopPropagation) {
                this.hovered.setStopPropagation(id);
                return false;
            }
            return true;
        });

        this.setHandler("mousemove", (p) => {
            const id = p.interactive.id;
            const hit = this.hit(p, e);
            const pressed = this.pressed.has(id);
            const decorator = new MouseEventDecorator(e, pressed, hit);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onmouseleave(e: MouseEvent) {
        this.setHandler("leave", (p) => {
            const id = p.interactive.id;
            if (!this.hovered.has(id)) return true;
            this.hovered.clear(id);
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return true;
        });

        this.pressed.clearAll();
    }

    onmouseup(e: MouseEvent) {
        this.setHandler("mouseup", (p) => {
            const id = p.interactive.id;
            if (!this.pressed.has(id)) return true;
            this.pressed.clear(id);
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onmousedown(e: MouseEvent) {
        this.setHandler("mousedown", (p) => {
            if (!this.hit(p, e)) return true;
            const id = p.interactive.id;
            if (this.pressed.has(id)) return true;
            this.pressed.set(id);
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onkeyup(e: KeyboardEvent) {
        this.setHandler("keyup", (p) => {
            const decorator = new KeyboardEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onkeydown(e: KeyboardEvent) {
        this.setHandler("keydown", (p) => {
            const decorator = new KeyboardEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onwheel(e: WheelEvent): any {
        this.setHandler("wheel", (p) => {
            const decorator = new MouseEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    ondragover(e: DragEvent): any {
        this.setHandler("dragover", (p) => {
            e.preventDefault();
            e.dataTransfer!!.dropEffect = "move";
            if (!this.hit(p, e)) {
                return true;
            }
            const id = p.interactive.id;
            this.dragged.set(id);
            const decorator = new DragEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });

        this.setHandler("dragleave", (p) => {
            if (this.hit(p, e)) return true;
            const id = p.interactive.id;
            if (!this.dragged.has(id)) return true;
            this.dragged.clear(id);
            const decorator = new DragEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    ondragleave(e: DragEvent): any {
        this.setHandler("dragleave", (p) => {
            this.dragged.clearAll();
            const decorator = new DragEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    ondrop(e: DragEvent): any {
        this.setHandler("drop", (p) => {
            if (!this.hit(p, e)) return true;
            const decorator = new DragEventDecorator(e);
            p.listener(this.createEvent(decorator, p));

            return !decorator.isStopPropagation;
        });
    }

    onblur(e: FocusEvent): any {
        throw new Error(("Method not implemented." + e) as string);
    }

    onfocus(e: FocusEvent): any {
        throw new Error(("Method not implemented." + e) as string);
    }

    private setHandler(name: keyof EventType, callback: (p: ListenerType) => boolean) {
        const handlers = this.handlers[name];
        if (!handlers) return;

        for (const handler of handlers) {
            if (!callback(handler)) break;
        }
    }

    private createEvent<T>(e: T, p: ListenerType) {
        return new InteractiveEvent(e, p.interactive, this.element);
    }

    private hit(p: ListenerType, e: MouseEvent) {
        return p.interactive.inPath(new Point(e.offsetX, e.offsetY));
    }
}

export default HandlerResolver;
