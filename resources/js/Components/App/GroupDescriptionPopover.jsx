import { Popover, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

export default function GroupDescriptionPopover({description}) {
    return(
        <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${
                open ? "text-gray-200" : "text-gray-500"}
                 hover:text-gray-200`}
            >
                <ExclamationCircleIcon className="w-4"/>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-[300px] px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="bg-gray-800 p-4">
                    <h2 className="text-lg mb-3">
                        Description
                    </h2>
                    {description && (
                        <div className="text-xs">
                            {description}
                            </div>
                    )}
                         {!description && (
                        <div className="text-xs text-gray-500 text-center py-4">
                           No description is defined.
                            </div>
                    )}
                    </div>
                </div>
              </Popover.Panel>             
            </Transition>
            </>
        )}
        </Popover>

    );
}