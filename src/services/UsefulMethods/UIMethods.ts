export function numberWithCommas(x: number | undefined) {
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