import {
    PaperClipIcon,
    ArrowDownTrayIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "../../helpers";

const MessageAttachments = ({ attachments, attachmentClick }) => {
    return (
        <>
            {attachments.length > 0 && (
                <div className="flex justify-end gap-1 mt-2-wrap">
                    {attachments.map((attachment, ind) => (
                        <div
                            onClick={(ev) => attachmentClick(attachments, ind)}
                            key={attachment.id}
                            className={`group flex flex-col items-center justify-center text-gray-500
                            relative cursor-pointer ` +
                                isAudio(attachment) 
                                ? "w-84" 
                                : "w-32 aspect-square bg-blue-100"
                            }
                        >
                            {!isAudio(attachment) && (
                                <a
                                onClick={(ev) => ev.stopPropagation()}
                                download href = {attachment.url}
                                className="absolute right-0 z-20 flex items-center justify-center w-8 h-8 text-gray-100 transition-all bg-gray-700 rounded opacity-100 group-hover:opacity-100 top-cursor-pointer hover:bg-gray-800"
                                >
                                    <ArrowDownTrayIcon className="w-4 h-4"/>
                                    
                                </a>
                            )} 
                            {isImage(attachment)&& (
                                <img src={attachment.url}
                                className="object-contain aspect-square"
                                />
                            )}
                           {isVideo(attachment) && (
                            <div className="relative flex justify-center items-center">
                                <PlayCircleIcon className="z-20 absolute w-16 h-16 text-white opacity-70"/>
                                <div className="absolute left-0 top-0 w-full h-full bg-black/50 z-10"></div>
                                <video src={attachment.url}></video>
                                </div>

                           )}
                           {isAudio(attachment)&& (
                            <div className="relative flex justify-center items-center">
                            <audio src={attachment.url}
                            controls></audio>
                        </div>
                    )}
                    {isPDF(attachment) && (
                        <div className="relative flex justify-center items-center">
                            <div className="absolute left-0 top-0 right-0 bottom-0"></div>
                            <iframe src={attachment.url}
                            className="w-full h-full"></iframe>
                        </div>
                    )}
                    {!isPreviewable (attachment) && (
                        <a onClick={(ev) => ev.stopPropagation()}
                    download href={attachment.url}
                className="flex flex-col justify-center items-center">
                    <PaperClipIcon className="w-10 h-10 mb-3"/>

                    <small>{attachment.name}</small>
                </a>
                    )}
                </div>
            ))}
            </div>
            )}
        </>
    );
};

export default MessageAttachments;
