import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, ShieldCheckIcon, TrashIcon,UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment } from "react";

export default function MessageOptionsDropdown({ message }) {


   const onMessageDelete = () => {
    console.log("Delete message");
    axios
    .delete(route("message.destroy", message.id))
    .then((res) => {
        emit ('message.deleted', message);
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
   };

    return (
        <div className="absolute right-full text-gray-100 top-1/2 -translate-y-1/2 z-10">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 z-50 w-48 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={onMessageDelete}
                                        className={`${
                                            active ? 'bg-black/30 text-white' : 'text-gray-100'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                     <TrashIcon className="w-4 h-4 mr-2"/>
                                     Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
