import { Scene, Renderer } from "../src";

let fillColor = getRandomColor();

const scene = new Scene();

const layer = scene.createLayer();
const shapeCircle = layer.createShape({ fill: fillColor }).circle(100, 100, 50);
const shapeRect = layer.createShape({ fill: fillColor }).rect(200, 75, 100, 50);

const canvas = document.getElementById("canvas");

// @ts-ignore: Object is possibly 'null'.
canvas.width = 500;
// @ts-ignore: Object is possibly 'null'.
canvas.height = 250;

// @ts-ignore: Object is possibly 'null'.
const context = canvas.getContext("2d");
const renderer = new Renderer(context);

renderer.render(scene);
renderer.onFrameChanged = () => {
    shapeCircle.update({ fill: fillColor });
    shapeRect.update({ fill: fillColor });
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
