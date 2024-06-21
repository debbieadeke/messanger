import { useState, Fragment } from "react";
import {
    PaperClipIcon,
    PhotoIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    XCircleIcon
} from "@heroicons/react/24/solid";
import NewMessageInput from "./NewMessageInput";
import EmojiPicker from "emoji-picker-react";
import { Popover } from '@headlessui/react';
import { isAudio, isImage } from "@/helpers";
import CustomAudioPlayer from "./CustomAudioPlayer";
import AttachmentPreview from "./AttachmentPreview";

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onFileChange = (ev) => {
        const files = ev.target.files;
        const updatedFiles = [...files].map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file),
            };
        });
        
        setChosenFiles((prevFiles) => {
            return [...prevFiles, ...updatedFiles];
        });
    };

    const onSendClick = () => {
        if (messageSending) {
            return;
        }
        if (newMessage.trim() === "" && chosenFiles.length === 0) {
            setInputErrorMessage("Please provide a message or upload attachments.");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }
        
        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
        formData.append("message", newMessage);
        if (conversation.is_user) {
            formData.append("receiver_id", conversation.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }
        
        setMessageSending(true);
        
        axios.post(route("message.store"), formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                console.log(progress);
                setUploadProgress(progress);
            }
        }).then((response) => {
            setNewMessage("");
            setMessageSending(false);
            setUploadProgress(0);
            setChosenFiles([]);
        }).catch((error) => {
            setMessageSending(false);
            setChosenFiles([]);
            setUploadProgress(0);
            const message = error?.response?.data?.message;
            setInputErrorMessage(
                message || "An error occurred while sending message"
            );
        });
    };

    const onLikeClick = () => {
        if (messageSending) {
            return;
        }
        const data = {
            message: "👍",
        };
        if (conversation.is_user) {
            data["receiver_id"] = conversation.id;
        } else if (conversation.is_group) {
            data["group_id"] = conversation.id;
        }
        axios.post(route("message.store"), data);
    };

    return (
        <div className="flex flex-wrap items-start py-3 border-t border-slate-700">
            <div className="flex-1 order-2 p-2 xs:flex-none xs:order-1">
                <button className="relative p-1 text-gray-400 hover:text-gray-300">
                    <PaperClipIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="absolute top-0 bottom-0 left-0 right-0 z-20 opacity-0 cursor-pointer"
                    />
                </button>
                <button className="relative p-1 text-gray-400 hover:text-gray-300">
                    <PhotoIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onFileChange}
                        className="absolute top-0 bottom-0 left-0 right-0 z-20 opacity-0 cursor-pointer"
                    />
                </button>
            </div>

            <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
                <div className="flex">
                    <NewMessageInput
                        value={newMessage}
                        onSend={onSendClick}
                        onChange={(ev) => setNewMessage(ev.target.value)}
                    />
                    <button onClick={onSendClick} 
                        disabled={messageSending}
                        className="btn btn-info rounded-none flex items-center"
                    >
                        <PaperAirplaneIcon className="w-6" />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                {!!uploadProgress && (
                    <progress
                        className="w-full progress progress-info"
                        value={uploadProgress}
                        max="100"
                    ></progress>
                )}
                {inputErrorMessage && (
                    <p className="text-xs text-red-400">{inputErrorMessage}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                    {chosenFiles.map((file) => (
                        <div
                            key={file.file.name}
                            className={`relative flex justify-between cursor-pointer` +
                                 (!isImage(file.file) ? "w-[240px]" : "")
                            }
                        >
                            {isImage(file.file) && (
                                <img src={file.url} alt="" className="object-cover w-16 h-16" />
                            )}
                            {isAudio(file.file) && (
                                <CustomAudioPlayer file={file} showVolume={false} />
                            )}
                            {!isAudio(file.file) &&  !isImage(file.file) && (
                                <AttachmentPreview file={file}/>
                            )}
                          
                            <button
                                onClick={() =>
                                    setChosenFiles(
                                        chosenFiles.filter(
                                            (f) => f.file.name !== file.file.name
                                        )
                                    )
                                }
                                className="absolute z-10 w-6 h-6 text-gray-300 bg-gray-800 rounded-full -top-2 -right-2 hover:text-gray-100"
                            >
                                <XCircleIcon className="w-6" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex order-3 p-2 xs:order-3">
                <Popover className="relative">
                    <Popover.Button className="p-1 text-gray-400 hover:text-gray-300">
                        <FaceSmileIcon className="w-6 h-6" />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-0 z-10 bottom-full">
                        <EmojiPicker
                            theme="dark"
                            onEmojiClick={(ev) => setNewMessage(newMessage + ev.emoji)}
                        />
                    </Popover.Panel>
                </Popover>
                <button onClick={onLikeClick} className="p-1 text-gray-400 hover:text-gray-300">
                    <HandThumbUpIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
