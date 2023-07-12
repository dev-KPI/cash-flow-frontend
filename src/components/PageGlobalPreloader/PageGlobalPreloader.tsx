import React, {useState, useEffect} from "react";

import PreLoader from "@components/PreLoader/PreLoader";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";


const PageGlobalLoader = () => {

    const [isPageLoading = true, setIsPageLoading] = useState<boolean>()
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    setTimeout(() => {
        setIsPageLoading(false)
    }, 2000)

    return isPageLoading ? <div style={{position:'absolute', zIndex: 9999, 
    width: '100%', height: '100%', backgroundColor: ThemeStore.backgroundColor,
    display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PreLoader preLoaderSize={50} type='auto'/> 
    </div> : null
}

export default PageGlobalLoader;