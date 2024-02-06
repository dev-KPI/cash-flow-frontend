
import { useState, useRef, FC } from "react";

//logic
import { Dropdown as DropdownComponent, DropdownProps } from 'primereact/dropdown';
import { IconOptions } from "primereact/utils";
import { useClickOutside } from "primereact/hooks";
//UI
import  './Dropdown.css'

interface Group {
    id: number,
    title: string,
    icon_url: string,
    color_code: string
}

const Dropdown = () => {
    const [selectedCountry, setSelectedCountry] = useState<Group | null>(null);
    const dropdownComponent = useRef<DropdownComponent>(null);
    const dropdownInput = useRef<HTMLSelectElement>(null);
    const countries: Array<Group> = [
        { id: 0, title: 'TItle1', icon_url: "_icon-basketball-team", color_code: "#FF2D55" },
        { id: 1, title: 'TItle2', icon_url: "bi bi-apple", color_code: "#CCFF00" },
        { id: 2, title: 'TItleqweqweqweqweqweqweqweSeqweqweqweqweqwe3', icon_url: "bi bi-people", color_code: "#FF2D55" },
        { id: 3, title: 'TItle4', icon_url: "bi bi-people", color_code: "#FF2D55" },
        { id: 4, title: 'TItle5', icon_url: "_icon-basketball-team", color_code: "#FF2D55", },
        { id: 5, title: 'TItle6', icon_url: "_icon-basketball-team", color_code: "#FF2D55", },
        { id: 6, title: 'TItle7', icon_url: "_icon-basketball-team", color_code: "#FF2D55", },

    ];
    
    const closeDropdown = (e: React.MouseEvent) => {
        if(dropdownComponent.current){
            if(dropdownComponent.current.getOverlay()){
                if(!(e.target as HTMLElement).closest('div.' + dropdownComponent.current.getOverlay().classList[0]) 
                && (!(e.target as HTMLElement).closest('div.p-dropdown-trigger'))) {
                    dropdownComponent.current.hide()
                }
            }
        }
    }
    useClickOutside(dropdownInput, closeDropdown);
    

    const selectedGroupTemplate = (option: Group , props: DropdownProps) => {
        if (option) {
            return (
                <div className="optionWrapper">
                <div 
                style={{backgroundColor: option.color_code}}
                className="icon">
                    <i className={option.icon_url}></i>
                </div>
                <p className="title">{option.title}</p>
            </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const groupOptionTemplate = (option: Group) => {
        return (
            <div className="optionWrapper">
                <div 
                style={{backgroundColor: option.color_code}}
                className="icon">
                    <i className={option.icon_url}></i>
                </div>
                <p className="title">{option.title}</p>
            </div>
        );
    };

    return (
        <div className="dropdown">
            <DropdownComponent value={selectedCountry} onChange={(e)=> setSelectedCountry(e.value)} options={countries} optionLabel="title" optionValue="title" placeholder="Select a Country" 
            ref={dropdownComponent}     
            inputRef={dropdownInput}   
            filter 
            valueTemplate={selectedGroupTemplate} 
            itemTemplate={groupOptionTemplate} 
            dropdownIcon={(opts: IconOptions<DropdownProps, any>) => {
                const iconClass = opts.iconProps['data-pr-overlay-visible'] ? 'chevronTransition' : '';
                return <i style={{color: 'var(--main-text)'}} className={'bi bi-chevron-down chevron ' + iconClass }></i>
            }}
            />
        </div>    
    )
}
        
export default Dropdown;