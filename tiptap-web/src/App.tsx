// @ts-nocheck
import { useEditor, EditorContent, Editor, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Mention from "@tiptap/extension-mention";
import { MentionList } from "./MentionList";
import "./styles.css";
import tippy from "tippy.js";
import Placeholder from "@tiptap/extension-placeholder";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const bold = () => editor.chain().focus().toggleBold().run();
  window.bold = bold;
  const italic = () => editor.chain().focus().toggleItalic().run();
  window.italic = italic;
  const strike = () => editor.chain().focus().toggleStrike().run();
  window.strike = strike;
  const code = () => editor.chain().focus().toggleCode().run();
  window.code = code;
  const clearMarks = () => editor.chain().focus().unsetAllMarks().run();
  window.clearMarks = clearMarks;
  const clearNodes = () => editor.chain().focus().clearNodes().run();
  window.clearNodes = clearNodes;
  const paragraph = () => editor.chain().focus().setParagraph().run();
  window.paragraph = paragraph;
  const h1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  window.h1 = h1;
  const h2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  window.h2 = h2;
  const h3 = () => editor.chain().focus().toggleHeading({ level: 3 }).run();
  window.h3 = h3;
  const h4 = () => editor.chain().focus().toggleHeading({ level: 4 }).run();
  window.h4 = h4;
  const h5 = () => editor.chain().focus().toggleHeading({ level: 5 }).run();
  window.h5 = h5;
  const h6 = () => editor.chain().focus().toggleHeading({ level: 6 }).run();
  window.h6 = h6;
  const bulletList = () => editor.chain().focus().toggleBulletList().run();
  window.bulletList = bulletList;
  const orderedList = () => editor.chain().focus().toggleOrderedList().run();
  window.orderedList = orderedList;
  const codeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  window.codeBlock = codeBlock;
  const blockQuote = () => editor.chain().focus().toggleBlockquote().run();
  window.blockQuote = blockQuote;
  const horizontalRule = () => editor.chain().focus().setHorizontalRule().run();
  window.horizontalRule = horizontalRule;
  const hardBreak = () => editor.chain().focus().setHardBreak().run();
  window.hardBreak = hardBreak;
  const undo = () => editor.chain().focus().undo().run();
  window.undo = undo;
  const redo = () => editor.chain().focus().redo().run();
  window.redo = redo;
  const left = () => editor.chain().focus().setTextAlign("left").run();
  window.left = left;
  const center = () => editor.chain().focus().setTextAlign("center").run();
  window.center = center;
  const right = () => editor.chain().focus().setTextAlign("right").run();
  window.right = right;
  const justify = () => editor.chain().focus().setTextAlign("justify").run();
  window.justify = justify;

  const activeStates = {
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    strike: editor.isActive("strike"),
    code: editor.isActive("code"),
    paragraph: editor.isActive("paragraph"),
    h1: editor.isActive("heading", { level: 1 }),
    h2: editor.isActive("heading", { level: 2 }),
    h3: editor.isActive("heading", { level: 3 }),
    h4: editor.isActive("heading", { level: 4 }),
    h5: editor.isActive("heading", { level: 5 }),
    h6: editor.isActive("heading", { level: 6 }),
    bulletList: editor.isActive("bulletList"),
    orderedList: editor.isActive("orderedList"),
    codeBlock: editor.isActive("codeBlock"),
    blockQuote: editor.isActive("blockquote"),
    left: editor.isActive({ textAlign: "left" }),
    center: editor.isActive({ textAlign: "center" }),
    right: editor.isActive({ textAlign: "right" }),
    justify: editor.isActive({ textAlign: "justify" })
  };

  const data = {
    html: editor.getHTML(),
    json: editor.getJSON()
  };

  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        data,
        activeStates
      })
    );
  }

  if (window.ReactNativeWebView) return null;

  return (
    <>
      <button onClick={bold} className={activeStates.bold ? "is-active" : ""}>
        bold
      </button>
      <button
        onClick={italic}
        className={activeStates.italic ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={strike}
        className={activeStates.strike ? "is-active" : ""}
      >
        strike
      </button>
      <button onClick={code} className={activeStates.code ? "is-active" : ""}>
        code
      </button>
      <button onClick={clearMarks}>clear marks</button>
      <button onClick={clearNodes}>clear nodes</button>
      <button
        onClick={paragraph}
        className={activeStates.paragraph ? "is-active" : ""}
      >
        paragraph
      </button>
      <button onClick={h1} className={activeStates.h1 ? "is-active" : ""}>
        h1
      </button>
      <button onClick={h2} className={activeStates.h2 ? "is-active" : ""}>
        h2
      </button>
      <button onClick={h3} className={activeStates.h3 ? "is-active" : ""}>
        h3
      </button>
      <button onClick={h4} className={activeStates.h4 ? "is-active" : ""}>
        h4
      </button>
      <button onClick={h5} className={activeStates.h5 ? "is-active" : ""}>
        h5
      </button>
      <button onClick={h6} className={activeStates.h6 ? "is-active" : ""}>
        h6
      </button>
      <button
        onClick={bulletList}
        className={activeStates.bulletList ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={orderedList}
        className={activeStates.orderedList ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={codeBlock}
        className={activeStates.codeBlock ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={blockQuote}
        className={activeStates.blockQuote ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={horizontalRule}>horizontal rule</button>
      <button onClick={hardBreak}>hard break</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <button onClick={left} className={activeStates.left ? "is-active" : ""}>
        left
      </button>
      <button
        onClick={center}
        className={activeStates.center ? "is-active" : ""}
      >
        center
      </button>
      <button onClick={right} className={activeStates.right ? "is-active" : ""}>
        right
      </button>
      <button
        onClick={justify}
        className={activeStates.justify ? "is-active" : ""}
      >
        justify
      </button>
    </>
  );
};

window.mentions = [];
window.setMentions = (arrayString: string) => {
  try {
    const mentionsListArray = JSON.parse(arrayString);
    const validValues = mentionsListArray.filter(
      (each) => typeof each === "string"
    );
    window.mentions = validValues;
  } catch (e) {
    // invalid object do nothing...
  }
};

const App = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "placeholder here..."
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention"
        },
        suggestion: {
          items: (query) => {
            return window.mentions
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5);
          },
          render: () => {
            let reactRenderer: ReactRenderer;
            let popup: unknown[];

            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor
                });

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start"
                });
              },
              onUpdate(props) {
                reactRenderer.updateProps(props);

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect
                });
              },
              onKeyDown(props) {
                if (props.event.key === "Escape") {
                  popup[0].hide();

                  return true;
                }

                return reactRenderer.ref?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                reactRenderer.destroy();
              }
            };
          }
        }
      }),
      Highlight
    ],
    content: `<p>
    What do you all think about the new <span data-mention data-id="Winona Ryder"></span> movie?
  </p>`
  });

  window.setContentHtml = (html: string) => editor?.commands.setContent(html);
  window.setContentJson = (jsonString: string) => {
    try {
      const newData = JSON.parse(jsonString);
      editor?.commands.setContent(newData);
    } catch (e) {
      // invalid json do nothing
    }
  };

  if (!editor) return null;

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default App;
