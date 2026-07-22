import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { useState } from "react";

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  console.log(copied);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm uppercase text-slate-400">{language}</span>

        <button
          className="text-lg text-slate-400 cursor-pointer"
          onClick={handleCopy}
        >
          {copied ? <LuCheck /> : <LuCopy />}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "1rem",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
