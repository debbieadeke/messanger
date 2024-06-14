import React, { useEffect, useRef } from "react";

const NewMessageInput = ({ value, onChange, onSend }) => {
  const inputRef = useRef(null);

  const onInputKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      onSend();
    }
  };

  const onChangeEvent = (ev) => {
    setTimeout(() => {
      adjustHeight();
    }, 10);
    onChange(ev);
  };

  const adjustHeight = () => {
    setTimeout(() => {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + 1 + "px";
    }, 100);
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      rows="1"
      placeholder="Type a message"
      onKeyDown={onInputKeyDown}
      onChange={(ev) => onChangeEvent(ev)}
      className="input input-bordered w-full rounded-r-none resize-none overflow-y-auto max-h-40"
    ></textarea>
  );
};

export default NewMessageInput;
