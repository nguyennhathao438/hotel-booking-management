import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { Context } from "./RoomContext";
import { useContext } from "react";
let lis = [
  { name: '1 Adults' },
  { name: '2 Adults' },
  { name: '3 Adults' },
  { name: '4 Adults' }
]
function Adults() {
  const { adults, setAdults } = useContext(Context)
  return (
    <Menu as='div' className="w-full h-full relative">
      {/* btn */}
      <Menu.Button className="flex items-center h-full w-full justify-between p-4 cursor-pointer">
        {adults}
        <BsChevronDown />
      </Menu.Button>
      <Menu.Items as='ul' className="bg-white text-center absolute w-full z-40">
        {lis.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => setAdults(item.name)}
              as='li'
              className="border-b p-2 cursor-pointer hover:bg-[#d2b48c]"
              key={index}
            >{item.name}
            </Menu.Item>);
        })}
      </Menu.Items>
    </Menu>
  );
}
export default Adults