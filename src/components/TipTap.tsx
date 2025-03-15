"use client";

import "./textstyles.css";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from '@tiptap/extension-bold'
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import React from "react";
import { Button } from "./ui/button";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 z-10 p-2 bg-white/80 backdrop-blur-sm w-full border-b flex-row flex">
      <Button
        variant="outline"
        onClick={() =>
          editor.chain().focus().insertContent("Hello, World!").run()
        }
      >
        HelloWorld
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleMark("bold").run()}
        disabled={!editor.can().chain().focus().toggleMark("bold").run()}
        className={editor.isActive("bold") ? "is-active shadow-xl bg-slate-100" : "shadow-none"}
      >
        B
      </Button>
    </div>
  );
};

const content = `
    type stuff here!
    `;

const extensions = [Document, Paragraph, Text, TextStyle, Bold];

const TipTap = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        immediatelyRender={false}
        content={content}
        editorProps={{
          attributes: {
            class:
              "prose prose-lg max-w-none flex-grow p-4 focus:outline-none overflow-auto t-[20px]",
          },
        }}
      />
    </div>
  );
};

export default TipTap;
