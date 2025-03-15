import { Extension } from "@tiptap/core";
import { Node as ProseMirrorNode } from "prosemirror-model";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    replaceVowels: {
      replaceVowels: () => ReturnType;
    };
  }
}

export const ReplaceVowels = Extension.create({
  name: "replaceVowels",

  addCommands() {
    return {
      replaceVowels:
        () =>
        ({ tr, dispatch }) => {
          if (!dispatch) return true;

          const doc = tr.doc;
          const processTextNode = (node: ProseMirrorNode, pos: number) => {
            const text = node.text;
            if (!text) return;

            const regex = /[aeiou]/gi;
            let match;
            while ((match = regex.exec(text)) !== null) {
              const from = pos + match.index;
              const to = from + 1;

              // Replace the vowel with a random vowel
              const vowels = ["a", "e", "i", "o", "u"];
              const randomVowel =
                vowels[Math.floor(Math.random() * vowels.length)];
              const randomChance = Math.random();

              if (randomChance < 0.1) {
                tr.insertText(randomVowel, from, to);
              }
            }
          };

          doc.descendants((node: ProseMirrorNode, pos: number) => {
            if (node.isText) {
              processTextNode(node, pos);
            }
          });

          return true;
        },
    };
  },
});

export default ReplaceVowels;