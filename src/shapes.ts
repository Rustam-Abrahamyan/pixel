const Shapes = {
    circle: (path, { x, y, radius }) => {
        path.arc(x, y, radius, 0, 2 * Math.PI, false);
    },
    rect: (path, { x, y, width, height }) => {
        path.rect(x, y, width, height);
    },
};

export default Shapes;
