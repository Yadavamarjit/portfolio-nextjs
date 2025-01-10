"use client";
import Sheet from "react-modal-sheet";
import { useState } from "react";
import { useMessages } from "@/context/MessageContext";
import ChatInterface from "../ChatInterFace/ChatInterFace";

export function MsgSheet() {
  const { toggleMsg, showMsg, messages } = useMessages();

  return (
    <>
      <Sheet
        className="shadow-lg shadow-accent"
        isOpen={showMsg}
        onClose={toggleMsg}
      >
        <Sheet.Container className="">
          <Sheet.Header />
          <Sheet.Content className="no-scrollbar px-3 pb-2">
            <ChatInterface messages={messages} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
