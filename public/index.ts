import { Scene, Renderer } from "../src";

let fillColor = getRandomColor();

const scene = new Scene();

const layer = scene.createLayer();
const shapeCircle = layer
    .createShape({ fill: fillColor })
    .circle(150, 150, 50)
    .on("contextmenu", (e) => {
        console.log("Custom context menu");
    })
    .on("hover", (e) => {
        e.target.stack[0].radius = 75;
        // e.target.styles;
        console.log("Circle :>> hover");
    })
    .on("leave", (e) => {
        e.target.stack[0].radius = 50;
        console.log("Circle :>> leave");
    });
const shapeRect = layer
    .createShape({ fill: fillColor })
    .rect(300, 125, 100, 50)
    .on("hover", (e) => {
        console.log("Rect :>> hover");
    })
    .on("leave", (e) => {
        console.log("Rect :>> leave");
    });
const shapeRoundRect = layer
    .createShape({ fill: fillColor })
    .roundRect(500, 125, 100, 50, [50, 50, 50, 50])
    .on("hover", (e) => {
        console.log("RoundRect :>> hover");
    })
    .on("leave", (e) => {
        console.log("RoundRect :>> leave");
    });

const canvas = document.getElementById("canvas");

// @ts-ignore: Object is possibly 'null'.
canvas.width = window.innerWidth;
// @ts-ignore: Object is possibly 'null'.
canvas.height = window.innerHeight;

// @ts-ignore: Object is possibly 'null'.
const context = canvas.getContext("2d");
const renderer = new Renderer(context);

renderer.render(scene);
renderer.onFrameChanged = () => {
    shapeCircle.update({ fill: fillColor });
    shapeRect.update({ fill: fillColor });
    shapeRoundRect.update({ fill: fillColor });
};

window.onload = () => {
    document.getElementById("change-color")?.addEventListener(
        "click",
        () => {
            fillColor = getRandomColor();
        },
        false
    );
};

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
