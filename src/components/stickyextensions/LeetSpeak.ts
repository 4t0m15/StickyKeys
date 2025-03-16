import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    leetspeak: {
      leetspeak: () => ReturnType;
    };
  }
}

const leetspeakDict: Record<string, string> = {
  I: "1",
  Z: "2",
  E: "3",
  A: "4",
  S: "5",
  T: "7",
  B: "8",
  O: "0",
};

export const LeetSpeak = Extension.create({
  name: "leetspeak",

  addCommands() {
    return {
      leetspeak:
        () =>
        ({ tr, dispatch }) => {
          if (!dispatch) return true;

          // Store replacements to make in a list first, then apply them
          const replacements: { from: number; to: number; text: string }[] = [];

          tr.doc.descendants((node, pos) => {
            if (node.isText) {
              const text = node.text || "";

              for (const [key, value] of Object.entries(leetspeakDict)) {
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

export default LeetSpeak;
