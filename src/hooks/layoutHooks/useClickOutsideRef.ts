import { RefObject, useEffect } from "react";

const useClickOutsideRef = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: any
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback, ref]);
};

export default useClickOutsideRef;