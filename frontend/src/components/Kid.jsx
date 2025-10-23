import { Menu,MenuButton,MenuItem,MenuItems } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { useContext } from "react";
import { Context } from "./RoomContext";
let lis = [
    { name: '0 Kids' },
    { name: '1 Kids' },
    { name: '2 Kids' },
    { name: '3 Kids' }
]
function Kids() {
    const {kids, setKids} = useContext(Context)
    return (
        <Menu as='div' className="h-full w-full relative">
            <MenuButton className=" w-full flex h-full items-center justify-between
            p-4 cursor-pointer">
                {kids === "0 Kids" ? "No kids" : kids}
                <BsChevronDown />
            </MenuButton>
            <MenuItems as='ul' className=" bg-white text-center w-full z-40 absolute">
                {lis.map((item, index) => {
                    return (
                        <MenuItem
                            onClick={() => setKids(item.name)}
                            as='li'
                            className="hover:bg-[#d2b48c] cursor-pointer p-2 border-b"
                            key={index}
                        >{item.name}
                        </MenuItem>);
                })}
            </MenuItems>
        </Menu>
    );
}
export default Kids