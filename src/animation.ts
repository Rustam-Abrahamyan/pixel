const animation: {
    requestAnimationFrame(callback: FrameRequestCallback): number;
    cancelAnimationFrame(id: number): void;
} = {
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => undefined,
};

if (window) {
    const vendors = ["ms", "moz", "webkit", "o"];

    animation.requestAnimationFrame = vendors
        .map((vendor) => window[vendor + "RequestAnimationFrame"])
        .reduce((accumulator, func) => accumulator || func, window.requestAnimationFrame);

    animation.cancelAnimationFrame = vendors
        .map((vendor) => window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"])
        .reduce((accumulator, func) => accumulator || func, window.cancelAnimationFrame);
}

if (!animation.requestAnimationFrame) {
    let lastTime = 0;
    animation.requestAnimationFrame = (callback) => {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!animation.cancelAnimationFrame) {
        animation.cancelAnimationFrame = (id) => {
            clearTimeout(id);
        };
    }
}

export const requestAnimationFrame = animation.requestAnimationFrame;

export const cancelAnimationFrame = animation.cancelAnimationFrame;
