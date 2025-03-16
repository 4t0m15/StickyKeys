"use client";
import Image from "next/image";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";

import "@/app/style.css";

// Define dialogue options in JSON format
const defaultDialogues = [
  "Hi! I'm Sticky Note, first name Sticky, last name Note",
  "Have you tried turning it off and on again?",
  "I spend most of my time stuck to things. It's my passion.",
  "Fun fact: I'm actually not made of real paper!",
  "Need any help navigating around? Just ask!",
  "Sometimes I dream of being a post-it note instead...",
  "Click anywhere on the site to minimize me if I'm in your way",
  "Did you know I'm powered by pixels? Digital life is strange.",
  "I'm here to assist, or just add some personality to the page",
  "Hot tip: Bookmark this site for easy access later!",
];

// Define the exposed ref API type
export type SpeechBubbleRef = {
  setText: (text: string) => void;
  showRandomText: () => void;
  hide: () => void;
  show: () => void;
  showButton: () => void;
  hideButton: () => void;
};

interface SpeechBubbleProps {
  initialText?: string;
  dialogues?: string[];
  typingSpeed?: number;
  initialDelay?: number;
  autoShow?: boolean;
  onYesClick?: () => void;
}

const SpeechBubble = forwardRef<SpeechBubbleRef, SpeechBubbleProps>(
  (
    {
      initialText,
      dialogues = defaultDialogues,
      typingSpeed = 30,
      initialDelay = 2000,
      autoShow = true,
      onYesClick,
    },
    ref,
  ) => {
    const [showBubble, setShowBubble] = useState(autoShow);
    const [showButton, setShowButton] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const fullTextRef = useRef(initialText || dialogues[0]);

    // Expose methods to parent components through ref
    useImperativeHandle(ref, () => ({
      setText: (text: string) => {
        fullTextRef.current = text;
        setCurrentText("");
        setIsTyping(true);
        setShowBubble(true);
      },
      showRandomText: () => {
        const randomIndex = Math.floor(Math.random() * dialogues.length);
        fullTextRef.current = dialogues[randomIndex];
        setCurrentText("");
        setIsTyping(true);
        setShowBubble(true);
      },
      hide: () => {
        setShowBubble(false);
      },
      show: () => {
        setShowBubble(true);
      },
      showButton: () => {
        setShowButton(true);
      },
      hideButton: () => {
        setShowButton(false);
      },
    }));

    // Show bubble after delay if autoShow is true
    useEffect(() => {
      if (!autoShow) return;

      const timer = setTimeout(() => {
        setShowBubble(true);
        setIsTyping(true);
      }, initialDelay);

      return () => clearTimeout(timer);
    }, [autoShow, initialDelay]);

    // Handle typing effect
    useEffect(() => {
      if (!isTyping || !showBubble) return;

      if (currentText.length < fullTextRef.current.length) {
        const typingTimer = setTimeout(() => {
          setCurrentText(fullTextRef.current.slice(0, currentText.length + 1));
        }, typingSpeed);

        return () => clearTimeout(typingTimer);
      } else {
        setIsTyping(false);
      }
    }, [currentText, isTyping, showBubble, typingSpeed]);

    // Function to change dialogue
    // const cycleDialogue = () => {
    //   const currentIndex = dialogues.indexOf(fullTextRef.current);
    //   const nextIndex = (currentIndex + 1) % dialogues.length;
    //   fullTextRef.current = dialogues[nextIndex];
    //   setCurrentText("");
    //   setIsTyping(true);
    // };

    return (
      <div
        className={cn(
          "fixed bottom-[200px] right-[100px] z-50",
          "transition-opacity duration-100 cursor-pointer",
          showBubble ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        //onClick={cycleDialogue}
      >
        <Image
          src="/speechbubble.png"
          alt="Sticky Note"
          width={200}
          height={200}
          unoptimized
          style={{ imageRendering: "pixelated" }}
        />
        <div className="absolute top-0 left-0 w-full h-full p-4 window nintyeight">
          <p className="nintyeight" style={{ fontSmooth: "never" }}>
            {currentText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
          {/* only show when user can interact */}
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (onYesClick) onYesClick();
            }}
            className={cn(
              "absolute bottom-[30px] right-auto ",
              showButton ? "block" : "hidden",
            )}
            style={{
              boxSizing: "border-box",
              border: "none",
              background: "#c0c0c0",
              boxShadow:
                "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
              borderRadius: 0,

              minWidth: "75px",
              minHeight: "23px",
              padding: "0 12px",
            }}
          >
            OK
          </button>
        </div>
        {/* button to click for the effect to happen. when this button is clicked the current sticky event will activate */}
      </div>
    );
  },
);

SpeechBubble.displayName = "SpeechBubble";

export default SpeechBubble;
