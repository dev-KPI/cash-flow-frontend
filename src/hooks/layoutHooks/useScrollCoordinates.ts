import { useLayoutEffect, useState, useEffect } from "react";


export interface IScrollCoordinates {
    pageXPos: number,
    pageYPos: number
}

export const useScrollCoordinates = (): IScrollCoordinates => {
    const [ScrollCoordinates, setScrollCoordinates] = useState<IScrollCoordinates>();
    
    useEffect(()=>{
        window.addEventListener('scroll', () => setScrollCoordinates({pageXPos: window.scrollX, pageYPos: window.scrollY}), { passive: true });
        return () => {
            window.removeEventListener('scroll', () => setScrollCoordinates({pageXPos: window.scrollX, pageYPos: window.scrollY}));
        };
    },[])

    return ScrollCoordinates || {
        pageXPos: 0,
        pageYPos: 0
    }
}