import HandlerResolver from "./handlerResolver";
import { EventType, Interactive } from "./interactive";
import { removeItem } from "../utils";

export interface IEventHandler {
    add<K extends keyof EventType>(interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void;
    remove<K extends keyof EventType>(interactive: Interactive, type: K): void;
}

type F<K extends keyof EventType> = { interactive: Interactive; listener: (ev: EventType[K]) => void };
export type ListenerType = F<keyof EventType>;
export type EventHandlers = Record<string, ListenerType[]>;

export class EventHandlerItem implements IEventHandler {
    handlers: EventHandlers = {};

    add<K extends keyof EventType>(interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void {
        if (!this.handlers[type]) this.handlers[type] = [];

        const s = { interactive, listener } as ListenerType;

        this.handlers[type].push(s);
    }

    remove<K extends keyof EventType>(interactive: Interactive, type: K): void {
        removeItem(this.handlers[type], (p) => p.interactive.id === interactive.id);
    }
}

class EventHandler {
    private handlers: EventHandlers;
    private element: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.element = canvas;
        this.handlers = {};
        this.init();
    }

    init() {
        const resolver = new HandlerResolver(this.handlers, this.element);

        this.element.onclick = (e) => resolver.onclick(e);
        this.element.ondblclick = (e) => resolver.ondblclick(e);
        this.element.oncontextmenu = (e) => resolver.oncontextmenu(e);
        this.element.onmousemove = (e) => resolver.onmousemove(e);
        this.element.onmouseup = (e) => resolver.onmouseup(e);
        this.element.onmousedown = (e) => resolver.onmousedown(e);
        this.element.onmouseleave = (e) => resolver.onmouseleave(e);
        this.element.onkeyup = (e) => resolver.onkeyup(e);
        this.element.onkeydown = (e) => resolver.onkeydown(e);
        this.element.onwheel = (e) => resolver.onwheel(e);
        this.element.onfocus = (e) => resolver.onfocus(e);
        this.element.onblur = (e) => resolver.onblur(e);
        this.element.ondragover = (e) => resolver.ondragover(e);
        this.element.ondrop = (e) => resolver.ondrop(e);
    }

    from(eventHandler: IEventHandler) {
        const handlers = (eventHandler as EventHandlerItem).handlers;
        const keys = Object.keys(handlers);

        for (const key of keys) {
            const incomingList = handlers[key];

            if (!this.handlers[key]) {
                this.handlers[key] = incomingList;
            }

            const origin = this.handlers[key];

            for (const i of incomingList) {
                if (origin.findIndex((p) => p.interactive.id === i.interactive.id) > -1) continue;
                
                origin.push(i);
            }
        }
    }
}

export default EventHandler;
