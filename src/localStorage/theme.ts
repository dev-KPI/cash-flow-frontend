export const isThemeInStorage = (theme?: string): string => {
    const themeInStorage = window.localStorage.getItem('data-theme');
    if(themeInStorage) {
        document.documentElement.setAttribute('data-theme', themeInStorage)
        return themeInStorage;
    }else{
        window.localStorage.setItem('data-theme', theme ? theme : 'light');
        return 'light';
    }
} 

export const setThemeInStorage = (theme: string): void => {
    const body = document.querySelector('body') as HTMLElement;
    window.localStorage.setItem('data-theme', theme);
    body.setAttribute('data-theme', theme);
}