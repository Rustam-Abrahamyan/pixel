class EventDecorator {
    #stopPropagation: boolean = false;

    stopPropagation(): void {
        this.#stopPropagation = true;
    }

    get isStopPropagation(): boolean {
        return this.#stopPropagation;
    }
}

export class MouseEventDecorator extends EventDecorator {
    readonly origin: MouseEvent;
    readonly pressed: boolean;
    readonly hit: boolean;
    constructor(event: MouseEvent | WheelEvent, pressed: boolean = false, hit: boolean = false) {
        super();
        this.origin = event;
        this.pressed = pressed;
        this.hit = hit;
    }

    get x(): number {
        return this.origin.offsetX;
    }

    get y(): number {
        return this.origin.offsetY;
    }
}

export class KeyboardEventDecorator extends EventDecorator {
    origin: KeyboardEvent;
    constructor(event: KeyboardEvent) {
        super();
        this.origin = event;
    }
}

export class FocusEventDecorator extends EventDecorator {
    origin: FocusEvent;
    constructor(event: FocusEvent) {
        super();
        this.origin = event;
    }
}

export class DragEventDecorator extends EventDecorator {
    origin: DragEvent;
    constructor(event: DragEvent) {
        super();
        this.origin = event;
    }
}
