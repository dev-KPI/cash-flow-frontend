import React, {useState, useEffect} from "react";

import PreLoader from "@components/PreLoader/PreLoader";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";


const PageGlobalLoader = () => {
    
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return <div style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ThemeStore.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <PreLoader preLoaderSize={50} type='auto'/> 
    </div> 
}

export default PageGlobalLoader;