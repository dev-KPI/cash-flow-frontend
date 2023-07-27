export function numberWithCommas(x: number) {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
        return x
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
    '#c90076', '#f6ffb2', '#1794bb', '#6312bf', '#FFFF00', '#FFCC00',
    '#00FF66', '#00FFCC', '#00FF99', '#00FFFF', '#0099FF', '#00CCFF',
    '#CCFF00', '#66FF00', '#99FF00', '#33FF00', '#00FF33', '#00FF00',
    '#CC00FF', '#FF00CC', '#FF00FF', '#FF0099', '#FF0033', '#FF0066',
    '#0066FF', '#0000FF', '#0033FF', '#3300FF', '#9900FF', '#6600FF',
];

export function handleWrap(
    containerClass: string, 
    wrappedClass: string,
    specialItemClass:string,
    rows: number) {
    let container: HTMLElement = document.getElementsByClassName(containerClass)[0] as HTMLElement
    if (!container || !wrappedClass || !specialItemClass) return
    if (window.matchMedia("screen and (max-width: 1028px)").matches && container.classList.contains('UserCategoriesCard_list__J8H-q')) 
        rows = 2;
    
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