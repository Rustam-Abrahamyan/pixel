type CursorGeneral = "default" | "none";
type LinksAndStatus = "context-menu" | "help" | "pointer" | "progress" | "wait";
type Selection = "cell" | "crosshair" | "text" | "vertical-text";
type DragAndDrop = "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing";
type ResizingAndScrolling =
    | "all-scroll"
    | "col-resize"
    | "row-resize"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ne-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "ew-resize"
    | "ns-resize"
    | "nesw-resize"
    | "nwse-resize";
type Zooming = "zoom-in" | "zoom-out";

type MouseCursorTypes = CursorGeneral | LinksAndStatus | Selection | DragAndDrop | ResizingAndScrolling | Zooming;

export default MouseCursorTypes;
