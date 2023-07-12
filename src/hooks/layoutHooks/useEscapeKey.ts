import React, {FC, useEffect, useState, useCallback} from 'react'

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keydown';

type HandleClose = () => void;

const useEscapeKey = (handleClose: HandleClose): void => {
    const handleEscKey = useCallback((event: KeyboardEvent) => {
        if (event.key === KEY_NAME_ESC) {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}
export default useEscapeKey