"use client";

import StickyNote from "@/components/sticky/stickynote";
import SpeechBubble, {
  SpeechBubbleRef,
} from "@/components/sticky/speechbubble";
import { useRef, useEffect, useState } from "react";

import "@/components/textstyles.css";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import { EditorProvider, useCurrentEditor, Editor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import React from "react";
import { Button } from "@/components/ui/button";

//Custom Sticky Extensions
import ReplaceVowels from "@/components/stickyextensions/ReplaceVowels";
import LeetSpeak from "@/components/stickyextensions/LeetSpeak";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 z-10 p-2 bg-white/80 backdrop-blur-sm w-full border-b flex-row flex">
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().replaceVowels().run()}
      >
        vowels
      </Button>
      <Button
        variant={"outline"}
        onClick={() => editor.chain().focus().leetspeak().run()}
      >
        l33t
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleMark("bold").run()}
        disabled={!editor.can().chain().focus().toggleMark("bold").run()}
        className={
          editor.isActive("bold")
            ? "is-active shadow-xl bg-slate-100"
            : "shadow-none"
        }
      >
        B
      </Button>
    </div>
  );
};

const content = `
  RAID: Shadow Legends

  Hey guys, thanks for tuning in to this episode of Waffle Productions. Today, we will be talking about how pancakes are smol. But first, I'd like to thank today's sponsor: RAID: Shadow Legends™. RAID: Shadow Legends™ is an immersive online experience with everything you'd expect from a brand new RPG title. It's got an amazing storyline, awesome 3D graphics, giant boss fights, PVP battles, and hundreds of never before seen champions to collect and customize. I never expected to get this level of performance out of a mobile game. Look how crazy the level of detail is on these champions! RAID: Shadow Legends™ is getting big real fast, so you should definitely get in early. Starting now will give you a huge head start. There's also an upcoming Special Launch Tournament with crazy prizes! And not to mention, this game is absolutely free! So go ahead and check out the video description to find out more about RAID: Shadow Legends™. There, you will find a link to the store page and a special code to unlock all sorts of goodies. Using the special code, you can get 50,000 Silver immediately, and a FREE Epic Level Champion as part of the new players program, courtesy of course of the RAID: Shadow Legends™ devs.
  Grammarly

  If you write ANYTHING on your computer, YOU NEED TO GET GRAMMARLY. I write pretty much ALL DAY every day and GRAMMARLY makes my writing better. As a student I like that it's FREE It actually is... correcting everything as I'm writing it. Grammar errors spelling errors... IT EVEN helps me find the right words to use!! SO I can say what I want to say!! It catches all those embarrassing little mistakes BEFORE I HIT SEND!!! I download GRAMMARLY around my freshman year becuase I was just... Ｈ Ｏ Ｒ Ｒ Ｉ Ｂ Ｌ Ｅ... at typing! Grammarly is like my secret weapon for writing papers. It's just the PERFECT tool for your resume, you know you don't want ANY errors when it's your first impression. I use GRAMMARLY for important emails, social media posts (which there are a L O T of.) I've used EVERY TOOL OUT THERE!! And Grammarly is by far the ＢＥＳＴ for improving your writing. GRAMMARLY is making me a better writer. AND it's free... I would recommend GRAMMARLY if you're a student, my family, my peers, my colleagues, It's like having YOUR OWN personal proof-reader for free.
  `;

const extensions = [
  Document,
  Paragraph,
  Text,
  TextStyle,
  Bold,
  ReplaceVowels,
  LeetSpeak,
];

interface TipTapProps {
  onEditorReady: (editor: Editor) => void;
}

const TipTap: React.FC<TipTapProps> = ({ onEditorReady }) => {
  const handleUpdate = ({ editor }: { editor: Editor }) => {
    if (editor) {
      onEditorReady(editor);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        immediatelyRender={false}
        content={content}
        onUpdate={handleUpdate}
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

export default function Home() {
  const bubbleRef = useRef<SpeechBubbleRef>(null);
  const [eventCount, setEventCount] = useState(0);
  const [stickyNoteReady, setStickyNoteReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleYesClick = () => {
    if (editorInstance && pendingAction) {
      console.log(`Executing action: ${pendingAction}`);

      switch (pendingAction) {
        case "randomizeVowels":
          editorInstance.chain().focus().replaceVowels().run();
          break;
        case "leetspeak":
          editorInstance.chain().focus().leetspeak().run();
          break;
        // Add more cases as needed
      }

      // Reset the pending action
      setPendingAction(null);

      // Hide the bubble after action is performed
      bubbleRef.current?.hide();
    }
  };

  // Pass the editor up from TipTap to Home
  const handleEditorReady = (editor: Editor) => {
    setEditorInstance(editor);
  };

  // run sticky appear after 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      bubbleRef.current?.show();
      //wait 2 seconds for the animation to finish
      setTimeout(() => {
        bubbleRef.current?.setText(
          "Hi I'm Sticky Note! First name Sticky Last name Note",
        );
        //wait for the typing to finish
        setTimeout(() => {
          setStickyNoteReady(true);
          bubbleRef.current?.hide();
        }, 1000);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  //every 2 seconds run a random event
  useEffect(() => {
    const interval = setInterval(() => {
      if (stickyNoteReady && editorInstance && !pendingAction) {
        const events = ["randomizeVowels", "leetspeak"];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setEventCount(eventCount + 1);

        setPendingAction(randomEvent);

        switch (randomEvent) {
          case "randomizeVowels":
            bubbleRef.current?.setText(
              "It looks like you've made some typos. Fix them now?",
            );
            break;
          case "leetspeak":
            bubbleRef.current?.setText(
              "This writing sucks dude, get with the times. Wanna fix it?",
            );
            break;
        }

        bubbleRef.current?.show();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [eventCount, stickyNoteReady, editorInstance, pendingAction]);

  return (
    <main>
      <SpeechBubble
        ref={bubbleRef}
        typingSpeed={20}
        onYesClick={handleYesClick}
      />
      <TipTap onEditorReady={handleEditorReady} />
      <StickyNote />
    </main>
  );
}
