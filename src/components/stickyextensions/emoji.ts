import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    emojiConvert: {
      emojiConvert: () => ReturnType;
    };
  }
}

const emojiDict: Record<string, string> = {
  " be ": " 🐝 ",
  " to ": " 2️⃣ ",
  " of ": " 📴 ",
  and: "👥",
  " a ": " 🅰 ",
  " in ": " 🏨 ",
  that: "👉",
  have: "🎁",
  " I ": " 🤓 ",
  me: "🤓",
  my: "🤓",
  it: "🤡",
  for: "4️⃣",
  not: "🚫",
  on: "🔛",
  with: "👥",
  we: "👥",
  he: "👨",
  his: "👨",
  him: "👨",
  she: "👩",
  hers: "👩",
  her: "👩",
  they: "🧑",
  them: "🧑",
  their: "🧑",
  as: "⏳",
  you: "🧑",
  do: "💩",
  at: "👇",
  this: "🌎",
  but: "🍑",
  by: "👋",
  from: "⏮",
  say: "🗣🗣🗣🔥🔥🔥",
  said: "🗣🗣🗣🔥🔥🔥",
  or: "↔",
  will: "📜",
  go: "🟢",
  can: "🥫",
  like: "👍",
  time: "⏰",
  no: "🚫",
};

export const EmojiConvert = Extension.create({
  name: "emojiConvert",

  addCommands() {
    return {
      emojiConvert:
        () =>
        ({ tr, dispatch }) => {
          if (!dispatch) return true;

          // Store replacements to make in a list first, then apply them
          const replacements: { from: number; to: number; text: string }[] = [];

          tr.doc.descendants((node, pos) => {
            if (node.isText) {
              const text = node.text || "";

              for (const [key, value] of Object.entries(emojiDict)) {
                const regex = new RegExp(key, "gi");
                let match;
                while ((match = regex.exec(text)) !== null) {
                  const randomChance = Math.random() < 0.2;
                  if (randomChance) {
                    replacements.push({
                      from: pos + match.index,
                      to: pos + match.index + match[0].length,
                      text: value,
                    });
                  }
                }
              }
            }
          });

          // Apply replacements in reverse order to avoid position shifts
          for (const { from, to, text } of replacements.reverse()) {
            tr.replaceWith(from, to, tr.doc.type.schema.text(text));
          }

          return true;
        },
    };
  },
});

export default EmojiConvert;
