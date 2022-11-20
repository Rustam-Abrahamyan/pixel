const Shapes = {
    circle: (path, { x, y, radius }) => {
        path.arc(x, y, radius, 0, 2 * Math.PI, false);
    },
    rect: (path, { x, y, width, height }) => {
        path.rect(x, y, width, height);
    },
};

export function createPath2D(stack): Path2D {
    const path = new Path2D();

    for (const shape of stack) Shapes[shape.type](path, { ...shape });

    return path;
}

export default Shapes;
