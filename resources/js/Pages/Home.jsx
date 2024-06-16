import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageItem from "@/Components/App/MessageItem";
import MessageInput from "@/Components/App/MessageInput";
import { useEventBus } from "@/EventBus";

function Home({ selectedConversation = null, messages = null }) {
  // console.log("messages", messages);
  const [localMessages, setLocalMessages] = useState([]);
  const messagesCtrRef = useRef(null);
  const { on } = useEventBus();
  const messageCreated = (message) => {
    if(
      selectedConversation && 
      selectedConversation.is_group && 
      selectedConversation.id == message.group_id
    ) {
      setLocalMessages((prevMessages)=>[...prevMessages, message]);
    }
    if(
      selectedConversation && 
      selectedConversation.is_user && 
      (selectedConversation.id == message.sender_id || 
        selectedConversation.id ==  message.receiver_id)
    ) {
      setLocalMessages((prevMessages)=>[...prevMessages, message]);
    }
    
    
  };

  useEffect(() => {
    setTimeout(() => {
      if (messagesCtrRef.current) {
        messagesCtrRef.current.scrollTop = 
        messagesCtrRef.current.scrollHeight;
      }
    }, 10);
    
   const offCreated = on('message.created', messageCreated);

   return ()=> {
    offCreated();
   }
  }, [selectedConversation]);

  useEffect(() => {
    setLocalMessages(messages ? messages.data.reverse() : []);
  }, [messages]);

  return (
    <>
      {!messages && (
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center opacity-35">
          <div className="p-16 text-2xl md:text-4xl text-slate-200">
            Please select conversation to see messages
          </div>
          <ChatBubbleLeftRightIcon className="inline-block w-32 h-32" />
        </div>
      )}
      {messages && (
        <>
          <ConversationHeader selectedConversation={selectedConversation}
          />>
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
