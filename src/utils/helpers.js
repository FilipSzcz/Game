export const drawId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const wait = (time) => new Promise((res) => setTimeout(res, time));

export const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const showMessage = async (ref, text, color, className) => {
    ref.current.innerHTML = text;
    ref.current.classList.add(className)
    ref.current.style.color = color;
    await wait(500);
    ref.current.classList.remove(className)
}