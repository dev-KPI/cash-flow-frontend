export function numberWithCommas(x: number) {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
        return x
}
export const fomatFloatNumber = (inputNumber: number, numbersAfterComma: number) => {
    if (inputNumber % 1 === 0) {
        return inputNumber.toString();
    } else {
        return inputNumber.toFixed(numbersAfterComma);
    }
}
export const parseColors = (hex: string) => {
    switch (hex) {
        case '#4C6FFF':
            return 'var(--main-blue)';
        case '#FF6E01':
            return 'var(--main-orange)';      
        case '#FF2D55':
            return 'var(--main-red)';
        case '#28CD41':
            return 'var(--main-green)';
        case '#D96FF8':
            return 'var(--main-purple)';
        default:
            return hex
    }
}
export const customColors: string[] = [
    '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00',
    '#CCFF00', '#99FF00', '#66FF00', '#33FF00', '#00FF00', '#00FF33',
    '#00FF66', '#00FF99', '#00FFCC', '#00FFFF', '#00CCFF', '#0099FF',
    '#0066FF', '#0033FF', '#0000FF', '#3300FF', '#6600FF', '#9900FF',
    '#CC00FF', '#FF00FF', '#FF00CC', '#FF0099', '#FF0066', '#FF0033',
    '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00'
];

// export const shaffledColors: string[] = [
//     '#c90076', '#f6ffb2', '#1794bb', '#6312bf', '#FFFF00', '#FFCC00',
//     '#00FF66', '#00FFCC', '#00FF99', '#00FFFF', '#0099FF', '#00CCFF',
//     '#CCFF00', '#66FF00', '#99FF00', '#33FF00', '#00FF33', '#00FF00',
//     '#CC00FF', '#FF00CC', '#FF00FF', '#FF0099', '#FF0033', '#FF0066',
//     '#0066FF', '#0000FF', '#0033FF', '#3300FF', '#9900FF', '#6600FF',
// ];
export const shaffledColors: string[] = [
    "#54bac3", "#ff2500", "#00a3ff", "#a3df00", "#ff4bff", "#00aa58",
    "#fc53ff", "#005a00", "#620088", "#96d07a", "#a10089", "#396700",
    "#ff7acf", "#003c00", "#2a97ff", "#ff6127", "#00b1ff", "#a80044",
    "#00d7e4", "#a90063", "#003000", "#ff739c", "#2f4300", "#003a9a",
    "#ffb57f", "#232d78", "#ffb78b", "#006ac1", "#9da36c", "#06050f",
    "#ffb9ed", "#0c0000", "#ff8cc0", "#421f00", "#925a93", "#4e5d54"
];

export const customIcons: string[] = [
    'bi bi-people', 'bi bi-activity', 'bi bi-alarm', 'bi bi-alipay', 'bi bi-apple', 'bi bi-android2',
    'bi bi-archive', 'bi bi-arrow-through-heart', 'bi bi-badge-3d', 'bi bi-badge-wc', 'bi bi-badge-vr', 'bi bi-bag-check',
    'bi bi-bag-heart', 'bi bi-bank', 'bi bi-bezier2', 'bi bi-basket2', 'bi bi-bandaid', 'bi bi-balloon',
    'bi bi-box-seam', 'bi bi-bookshelf', 'bi bi-boombox', 'bi bi-book', 'bi bi-binoculars', 'bi bi-bicycle',
    'bi bi-cup-hot', 'bi bi-cart', 'bi bi-camera', 'bi bi-calendar-date', 'bi bi-bus-front', 'bi bi-briefcase',
    'bi bi-airplane', 'bi bi-globe', 'bi bi-emoji-smile', 'bi bi-display', 'bi bi-database', 'bi bi-credit-card-2-front',
];



export function handleWrap(
    container: HTMLElement | null, 
    wrappedClass: string,
    specialItemClass:string,
    rows: number) {

    if (!container || !wrappedClass || !specialItemClass) return;
    
    const gap = parseFloat(getComputedStyle(container).gap)
    
    for (const child of container.children) {
        const childElement = child as HTMLElement;
        const prevSibling = childElement.previousElementSibling as HTMLElement;

        childElement.classList.remove(`${wrappedClass}`);

        const offsetHeight = container.offsetTop + gap + rows * childElement.offsetHeight

        if (childElement.offsetTop >= offsetHeight) {
            if (prevSibling)
                prevSibling.classList.add(`${wrappedClass}`);
            if (!childElement.classList.contains(`${specialItemClass}`)) {
                childElement.classList.add(`${wrappedClass}`);
            }
        }
    }
}

export const isUrl = (link: string) => {
    try { return Boolean(new URL(link)); }
    catch (e) { return false; }
}