export const uuid = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        
        return v.toString(16);
    });
};

export const removeItem = <T>(items: T[], predicate: ((item: T, index: number) => boolean) | number): void => {
    if (typeof predicate === "number") {
        items.splice(predicate, 1);
        return;
    }

    let index = -1;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (predicate(item, i)) {
            index = i;
            break;
        }
    }

    if (index >= 0) items.splice(index, 1);
};
