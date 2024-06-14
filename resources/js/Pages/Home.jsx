import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageItem from "@/Components/App/MessageItem";
import MessageInput from "@/Components/App/MessageInput";

function Home({ selectedConversation = null, messages = null }) {
  console.log("messages", messages);
  const [localMessages, setLocalMessages] = useState([]);
  const messagesCtrRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (messagesCtrRef.current) {
        messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
      }
    }, 10);
  }, [selectedConversation]);

  useEffect(() => {
    setLocalMessages(messages ? messages.data.reverse() : []);
  }, [messages]);

  return (
    <>
      {!messages && (
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center opacity-35">
          <div className="text-2xl md:text-4xl p-16 text-slate-200">
            Please select conversation to see messages
          </div>
          <ChatBubbleLeftRightIcon className="inline-block w-32 h-32" />
        </div>
      )}
      {messages && (
        <>
          <ConversationHeader selectedConversation={selectedConversation} />
          <div
            ref={messagesCtrRef}
            className="flex-1 p-5 overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 200px)' }} // Adjust this based on your layout
          >
            {/* Messages */}
            {localMessages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-lg text-slate-200">No messages found</div>
              </div>
            )}
            {localMessages.length > 0 && (
              <div className="flex flex-col flex-1">
                {localMessages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
            )}
          </div>
          <MessageInput conversation={selectedConversation}/>
        </>
      )}
    </>
  );
}

Home.layout = (page) => {
  return (
    <AuthenticatedLayout user={page.props.auth.user}>
      <ChatLayout children={page} />
    </AuthenticatedLayout>
  );
};

export default Home;
