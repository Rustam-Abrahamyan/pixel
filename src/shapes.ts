const Shapes = {
    arc: (path, { x, y, radius, startAngle, endAngle, counterclockwise }) => {
        path.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    },
    arcTo: (path, { x1, y1, x2, y2, radius }) => {
        path.arcTo(x1, y1, x2, y2, radius);
    },
    bezierCurveTo: (path, { cp1x, cp1y, cp2x, cp2y, x, y }) => {
        path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    },
    ellipse: (path, { x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise }) => {
        path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
    },
    circle: (path, { x, y, radius }) => {
        path.arc(x, y, radius, 0, 2 * Math.PI, false);
    },
    lineTo: (path, { x, y }) => {
        path.lineTo(x, y);
    },
    moveTo: (path, { x, y }) => {
        path.moveTo(x, y);
    },
    quadraticCurveTo: (path, { cpx, cpy, x, y }) => {
        path.quadraticCurveTo(cpx, cpy, x, y);
    },
    rect: (path, { x, y, width, height }) => {
        path.rect(x, y, width, height);
    },
    roundRect: (path, { x, y, width, height, radii }) => {
        path.roundRect(x, y, width, height, [...radii]);
    },
    beginPath: (path) => {
        path.beginPath();
    },
    closePath: (path) => {
        path.closePath();
    },
};

export function createPath2D(stack): Path2D {
    const path = new Path2D();

    for (const shape of stack) Shapes[shape.type](path, { ...shape });

    return path;
}

export default Shapes;
