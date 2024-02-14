
import { useRef, FC } from "react";

//logic
import { Dropdown as DropdownComponent, DropdownProps } from 'primereact/dropdown';
import { IconOptions } from "primereact/utils";
import { useClickOutside } from "primereact/hooks";
//UI
import  './Dropdown.css'
import { isValidHex, isValidIcon } from "@services/UsefulMethods/UIMethods";

interface Item {
    id: number,
    title: string,
    icon_url: string,
    color_code: string
}

interface IDropdownProps {
    placeholder: string,
    items: Item[],
    selectedOption: number,
    setOption: (id: number) => void
}
const Dropdown:FC<IDropdownProps> = ({ placeholder, items, selectedOption, setOption }) => {
    const dropdownComponent = useRef<DropdownComponent>(null);
    const dropdownInput = useRef<HTMLSelectElement>(null);
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
    

    const selectedItemTemplate = (option: Item , props: DropdownProps) => {
        if (option) {
            const color = isValidHex(option.color_code);
            const icon = isValidIcon(option.icon_url);
            return (
                <div className="optionWrapper">
                <div 
                style={{backgroundColor: color}}
                className="icon">
                    <i className={icon}></i>
                </div>
                <p className="title">{option.title}</p>
            </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const itemOptionTemplate = (option: Item) => {
        const color = isValidHex(option.color_code);
        const icon = isValidIcon(option.icon_url);
        return (
            <div className="optionWrapper">
                <div 
                style={{backgroundColor: color}}
                className="icon">
                    <i className={icon}></i>
                </div>
                <p className="title">{option.title}</p>
            </div>
        );
    };

    return (
        <div className="dropdown">
            <DropdownComponent value={selectedOption}
            onChange={(e)=> {
                setOption(e.value);
            }} 
            options={items} 
            optionLabel="title" 
            optionValue="id" 
            placeholder={items.length === 0 ? 'No items found' : placeholder}
            ref={dropdownComponent}     
            inputRef={dropdownInput}   
            filter
            disabled={items.length === 0}
            valueTemplate={selectedItemTemplate} 
            itemTemplate={itemOptionTemplate} 
            dropdownIcon={(opts: IconOptions<DropdownProps, any>) => {
                const iconClass = opts.iconProps['data-pr-overlay-visible'] ? 'chevronTransition' : '';
                return <i style={{color: 'var(--main-text)'}} className={'bi bi-chevron-down chevron ' + iconClass }></i>
            }}
            appendTo={'self'}
            />
        </div>    
    )
}
        
export default Dropdown;