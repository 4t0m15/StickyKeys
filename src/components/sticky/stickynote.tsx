"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";

// Define the ref type with the methods you want to expose
export interface StickyNoteRef {
  show: () => void;
  hide: () => void;
  showPlea: () => void;
  die: () => void;
}
/* eslint-disable */
const StickyNote = forwardRef<StickyNoteRef, {}>((props, ref) => {
  const [isHidden, setIsHidden] = useState(true);
  const [animation, setAnimation] = useState("stickyAppear");
  
  // Expose methods via useImperativeHandle
  useImperativeHandle(ref, () => ({
    show: () => {
      setIsHidden(false);
      setAnimation("stickyAppear");
    },
    hide: () => {
      setAnimation("stickyLeave");
      // Hide the component after animation completes
      setTimeout(() => {
        setIsHidden(true);
      }, 2000); // Adjust timeout based on animation duration
    },
    showPlea: () => {
      setIsHidden(false);
      setAnimation("stickyPlea");
    },
    die: () => {
      setAnimation("stickyDie");
      // Hide the component after animation completes
      setTimeout(() => {
        setIsHidden(true);
      }, 2000); // Adjust timeout based on animation duration
    }
  }));

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {
        animation === "stickyAppear" ? (
          <Image
            src="/Sticky-Appear.gif"
            alt="Sticky Note"
            width={200}
            height={200}
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className={cn(isHidden ? "hidden" : "block")}
          />
        ) : animation === "stickyLeave" ? (
          <Image
            src="/Sticky Leave.gif"
            alt="Sticky Note"
            width={200}
            height={200}
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className={cn(isHidden ? "hidden" : "block")}
          />
        ) : animation === "stickyPlea" ? (
          <Image
            src="/Sticky Plea.gif"
            alt="Sticky Note"
            width={200}
            height={200}
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className={cn(isHidden ? "hidden" : "block")}
          />
        ) : animation === "stickyDie" ? (
          <Image
            src="/Sticky die.gif"
            alt="Sticky Note"
            width={200}
            height={200}
            unoptimized
            style={{ imageRendering: "pixelated" }}
            className={cn(isHidden ? "hidden" : "block")}
          />
        ) : null
      }
    </div>
  );
});

// Add display name for better debugging
StickyNote.displayName = "StickyNote";

export default StickyNote;