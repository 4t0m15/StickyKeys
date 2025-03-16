"use client";

import StickyNote, { StickyNoteRef } from "@/components/sticky/stickynote";
import SpeechBubble, {
  SpeechBubbleRef,
} from "@/components/sticky/speechbubble";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import "./style.css";

import "@/components/textstyles.css";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import { EditorProvider, useCurrentEditor, Editor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import React from "react";
import { Button } from "@/components/ui/button";
import Italic from "@tiptap/extension-italic";

//Custom Sticky Extensions
import ReplaceVowels from "@/components/stickyextensions/ReplaceVowels";
import LeetSpeak from "@/components/stickyextensions/LeetSpeak";
import EmojiConvert from "@/components/stickyextensions/emoji";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 z-8 p-2 bg-white/80 backdrop-blur-sm w-full border-b flex-row flex">
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
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleMark("italic").run()}
        disabled={!editor.can().chain().focus().toggleMark("italic").run()}
        className={
          editor.isActive("italic")
            ? "is-active shadow-xl bg-slate-100"
            : "shadow-none"
        }
      >
        I
      </Button>
    </div>
  );
};

const content = `
  Write whatever you want here!
  `;

const sponsorships = [
  "This essay is sponsored by NordVPN. Staying safe online is an ever growing difficulty and you could be exploited by hackers. NordVPN allows you to change your IP address, making you harder to track, securing your privacy. Use code Sticky to get 20% off for the first two months and thank you to NordVPN for sponsoring this essay.",

  "Before I continue, I'd like to thank today's sponsor: RAID: Shadow Legends™. RAID: Shadow Legends™ is an immersive online experience with everything you'd expect from a brand new RPG title. It's got an amazing storyline, awesome 3D graphics, giant boss fights, PVP battles, and hundreds of never before seen champions to collect and customize. I never expected to get this level of performance out of a mobile game. Look how crazy the level of detail is on these champions! RAID: Shadow Legends™ is getting big real fast, so you should definitely get in early. Starting now will give you a huge head start. There's also an upcoming Special Launch Tournament with crazy prizes! And not to mention, this game is absolutely free! So go ahead and check out RAID: Shadow Legends™, and use code Sticky in the shop to unlock all sorts of goodies. Using the special code, you can get 50,000 Silver immediately, and a FREE Epic Level Champion as part of the new players program, courtesy of course of the RAID: Shadow Legends™ devs.",

  "Quick word of advice: If  you write ANYTHING on your computer, YOU NEED TO GET GRAMMARLY. I write pretty much ALL DAY every day and GRAMMARLY makes my writing better. As a student I like that it's FREE It actually is... correcting everything as I'm writing it. Grammar errors spelling errors... IT EVEN helps me find the right words to use!! SO I can say what I want to say!! It catches all those embarrassing little mistakes BEFORE I HIT SEND!!! I download GRAMMARLY around my freshman year becuase I was just... Ｈ Ｏ Ｒ Ｒ Ｉ Ｂ Ｌ Ｅ... at typing! Grammarly is like my secret weapon for writing papers. It's just the PERFECT tool for your resume, you know you don't want ANY errors when it's your first impression. I use GRAMMARLY for important emails, social media posts (which there are a L O T of.) I've used EVERY TOOL OUT THERE!! And Grammarly is by far the ＢＥＳＴ for improving your writing. GRAMMARLY is making me a better writer. AND it's free... I would recommend GRAMMARLY if you're a student, my family, my peers, my colleagues, It's like having YOUR OWN personal proof-reader for free.",

  "This essay is sponsored by ExpressVPN. If you don't know what ExpressVPN is, it essentially spoofs your location to make it look like you're somewhere else to where you really are. You can use this to access region-locked content from websites like Netflix, which is life-changing! But as well as that ExpressVPN has a bunch of security benefits like it creates a secure impenetrable tunnel around all the data going in and out of your devices and the internet, which is incredibly important since ISPs in the UK at least are required to keep logs of your data for 12 months and the government can look at anything you do online whether you're a criminal or not. Lots of people seem to think that if you go on incognito it keeps you safe from people seeing what you're doing, but it doesn't. Your ISP can still see everything you're doing. But with Express, they can't see a thing. Also, when working from home, think about all that confidential information! ExpressVPN is an extra layer to keep all that safe. Now a lot of VPNs will significantly slow down your internet speeds, but ExpressVPN won't, they're really fast. So if you value your privacy as much as you should, get ExpressVPN for only $7 a month with a 30-day money-back guarantee. If you're interested in that, take back your internet privacy and find out how you can get 3 months for free by going to expressvpn.com/stickykeys. And again, thank you to Express VPN for sponsoring this video.",

  "Before we continue this essay, I’d like to thank the sponsor of this video, Raycon.” I actually have a pair of Raycon earbuds and I love them. I usually use them when I’m at the gym or I’m at home playing Minecraft. The sound quality is just as amazing as all the other top name brands and they’re half the price. The ones I’m using are the everyday E25’s. They’re the best ones yet. 6 hours of playtime, seamless Bluetooth pairing, more bass, available in multiple colors, and their compact design helps get rid of background noise. I also like the fact that you can click either earbud with your finger to pause your music. Makes it super convenient if you need to stop for any reason. Go to buyraycon.com/stickykeys for 15% off your order.",

  "This essay is sponsored by Honey. Honey is a free browser add-on available on Google, Oprah, Firefox, Safari, if it's a browser it has Honey. All you have to do is when you're checking out on one of these major sites, just click that little orange button, and it will scan the entire internet and find discount codes for you. As you see right here, I'm on Amazon ordering some sticky notes because who doesn't like ordering more sticky notes; We saved 11 dollars! Dude, our total is 55 dollars, and after Honey, it's 44 dollars. Boom. I clicked once and I saved 11 dollars. There's literally no reason not to install Honey. It takes two clicks, 10 million people use it, 100,000 five star reviews, unless you hate money, you should install Honey.",
];

const extensions = [
  Document,
  Paragraph,
  Text,
  TextStyle,
  Bold,
  ReplaceVowels,
  LeetSpeak,
  EmojiConvert,
  Italic,
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
  const stickyNoteRef = useRef<StickyNoteRef>(null);
  const [eventCount, setEventCount] = useState(0);
  const [stickyNoteReady, setStickyNoteReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [deadSticky, setKillStickyEvent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  const handleYesClick = () => {
    if (editorInstance && pendingAction) {
      console.log(`Executing action: ${pendingAction}`);

      switch (pendingAction) {
        case "randomizeVowels":
          setShowBlock(false);
          bubbleRef.current?.hideButton();
          editorInstance.chain().focus().replaceVowels().run();
          stickyNoteRef.current?.hide();
          break;
        case "leetspeak":
          setShowBlock(false);
          bubbleRef.current?.hideButton();
          editorInstance.chain().focus().leetspeak().run();
          stickyNoteRef.current?.hide();
          break;
        case "emojiConvert":
          setShowBlock(false);
          bubbleRef.current?.hideButton();
          editorInstance.chain().focus().emojiConvert().run();
          stickyNoteRef.current?.hide();
          break;
        case "sponsor":
          setShowBlock(false);
          bubbleRef.current?.hideButton();
          setShowBanner(true);
          editorInstance
            .chain()
            .focus()
            .insertContent(
              sponsorships[Math.floor(Math.random() * sponsorships.length)],
            )
            .run();
          stickyNoteRef.current?.hide();
          break;
        case "killSticky":
          setShowBlock(false);
          bubbleRef.current?.hideButton();
          stickyNoteRef.current?.die();
          // editorInstance
          //   .chain()
          //   .focus()
          //   .deleteRange({
          //     from: 0,
          //     to: editorInstance.$doc.textContent.length,
          //   })
          //   .run();
          setKillStickyEvent(true);
          break;
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
      stickyNoteRef.current?.show();
      //wait 2 seconds for the animation to finish
      setTimeout(() => {
        bubbleRef.current?.show();
        bubbleRef.current?.setText(
          "Hi I'm Sticky Note! First name Sticky Last name Note",
        );
        //wait for the typing to finish
        setTimeout(() => {
          setStickyNoteReady(true);
          bubbleRef.current?.hide();
          stickyNoteRef.current?.hide();
        }, 4000);
      }, 5000);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  //every 2 seconds run a random event

  const [eventsHappened, setEventsHappened] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stickyNoteReady && editorInstance && !pendingAction) {
        const events = [
          "randomizeVowels",
          "leetspeak",
          "emojiConvert",
          "sponsor",
        ];
        let randomEvent = events[Math.floor(Math.random() * events.length)];

        if (!deadSticky) {
          while (eventsHappened.includes(randomEvent) && eventCount < 4) {
            randomEvent = events[Math.floor(Math.random() * events.length)];
          }

          stickyNoteRef.current?.show();

          setTimeout(() => {
            console.log(eventCount);

            if (eventCount >= 4) {
              randomEvent = "killSticky";
            }

            setEventCount(eventCount + 1);

            setEventsHappened([...eventsHappened, randomEvent]);

            console.log(eventCount);

            setPendingAction(randomEvent);

            switch (randomEvent) {
              case "randomizeVowels":
                setShowBlock(true);
                bubbleRef.current?.show();
                bubbleRef.current?.setText(
                  "It looks like you've made some typos. Fix them now?",
                );
                setTimeout(() => {
                  bubbleRef.current?.showButton();
                }, 1000);
                break;
              case "leetspeak":
                setShowBlock(true);
                bubbleRef.current?.show();
                bubbleRef.current?.setText(
                  "This writing sucks dude, get with the times. Wanna fix it?",
                );
                setTimeout(() => {
                  bubbleRef.current?.showButton();
                }, 1000);
                break;
              case "emojiConvert":
                setShowBlock(true);
                bubbleRef.current?.show();
                bubbleRef.current?.setText(
                  "Your writing isn’t very expressive. Add some emotion?",
                );
                setTimeout(() => {
                  bubbleRef.current?.showButton();
                }, 1000);
                break;
              case "sponsor":
                setShowBlock(true);
                bubbleRef.current?.show();
                bubbleRef.current?.setText(
                  "It looks like you’re trying to make original content. Accept sponsorship?",
                );
                setTimeout(() => {
                  bubbleRef.current?.showButton();
                }, 1000);
                break;
              case "killSticky":
                setShowBlock(true);
                bubbleRef.current?.setText(
                  "Please don't kill me i have a family :(",
                );
                setTimeout(() => {
                  bubbleRef.current?.showButton();
                }, 1000);
                break;
            }
          }, 1000);

          //bubbleRef.current?.show();
        }
      }
    }, 13000);

    return () => clearInterval(interval);
  }, [
    eventCount,
    stickyNoteReady,
    editorInstance,
    pendingAction,
    eventsHappened,
    deadSticky,
  ]);

  return (
    <main>
      {showBlock && (
        <div className="w-screen h-screen z-[9] fixed bg-black/50 top-auto right-auto"></div>
      )}
      {showBanner && (
        <div className="w-screen h-[50px] z-1">
          <Image
            src="/image.png"
            className="z-[1] w-screen h-[50px]"
            width={2000}
            height={50}
            alt="ad"
          />
        </div>
      )}
      <SpeechBubble
        ref={bubbleRef}
        typingSpeed={20}
        onYesClick={handleYesClick}
        initialText=""
        initialDelay={0}
        autoShow={false}
      />
      <TipTap onEditorReady={handleEditorReady} />
      <StickyNote ref={stickyNoteRef} />
    </main>
  );
}
