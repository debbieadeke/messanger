import { useState } from "react";
import {
    PaperClipIcon,
    PhotoIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import NewMessageInput from "./NewMessageInput";

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PaperClipIcon className="w-6"/>
                    <input
                    type="file"
                    multiple className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"/>
                </button>

                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PhotoIcon className="w-6"/>
                    <input
                    type="file"
                    multiple 
                    accept="image/*"
                    className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"/>
                </button>
            </div>

            <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
                <div className="flex">
                    <NewMessageInput
                    value={newMessage}
                    onChange={(ev) => setNewMessage(ev.target.value)}
                    />
                    <button className="btn btn-info rounded-1-none">
                        {messageSending && (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                        <PaperAirplaneIcon className="w-6"/>
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                {inputErrorMessage && (
                    <p className="text-xs text-red-400">{inputErrorMessage}</p>
                )}
            </div>
            
            <div className="order-3 xs:order-3 p-2 flex">
                <button className="p-1 text-gray-400 hover:text-gray-300">
                    <FaceSmileIcon className="w-6 h-6"/>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-300">
                        <HandThumbUpIcon className="w-6 h-6"/>
                    </button>
            </div>

        </div>
    );

};

export default MessageInput;