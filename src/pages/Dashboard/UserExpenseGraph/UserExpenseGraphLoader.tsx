import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import React, {FC} from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const getBars = () => {
  let res = [];
  for(let i = 0; i < 31; i++){
    res.push(<rect key={i + '2e3'} rx="10" ry="10" x={140 + i*(24 + 4)}  y={ i % 2 ? 124 : 196} width="24" height={ i % 2 ? 250 : 180} />)
  }
  return res
}

const getYScale = () => {
  let res = [];
  for(let i = 0; i < 5; i++){
    res.push(<rect key={i + 'sf3'} rx="5" ry="5" x="0"  y={133 + i*(20 + 35)} width="56" height="20" />)
  }
  return res
}
const getXScale = () => {
  let res = [];
  for(let i = 0; i < 31; i++){
    res.push(<rect key={i + '2se3'} rx="5" ry="5" x={143 + i*(24 + 4)}  y={ 384} width="20" height={ 10 } />)
  }
  return res
}


const UserExpenseGraphPreloader: FC<IContentLoaderProps> = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    return (
        <ContentLoader
        speed={2}
        viewBox="0 0 1015 410"
        backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
        foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
        <rect rx="5" ry="5" x="0"  y="6"  width="100" height="28" /> 
        <rect rx="5" ry="5" x="0"  y="50"  width="120" height="28" /> 
        {
            getYScale()
        }{
            getBars()
        }{
            getXScale()
        }
        </ContentLoader>
    )
}

export default UserExpenseGraphPreloader