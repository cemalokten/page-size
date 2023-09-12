import { useState } from "preact/hooks";

type Badge = {
  validatedURL?: String;
  size?: Number;
  color?: String;
};

const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function Badge({ color, size }: Badge) {
  const [htmlCopied, setHtmlCopied] = useState<boolean>(false);
  const [markdownCopied, setMarkdownCopied] = useState<boolean>(false);

  const HTML = `<a href="https://www.page-size.com" target="_blank" rel="noopener"><img src="${URL}/api/badge/${size}/${color}" alt="Page-size badge" style="height: 25px" /></a>`;
  const MARKDOWN = `[![Page-size Badge](${URL}/api/badge/${size}/${color})](http://www.page-size.com)`;

  const handleMarkdownCopy = async () => {
    try {
      await navigator.clipboard.writeText(MARKDOWN);
      setMarkdownCopied(true);
      setTimeout(() => setMarkdownCopied(false), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHtmlCopy = async () => {
    try {
      await navigator.clipboard.writeText(HTML);
      setHtmlCopied(true);
      setTimeout(() => setHtmlCopied(false), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      <img
        src={`${URL}/api/badge/${size}/${color}`}
        alt="page-size.com badge"
        style="height: 25px"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="text-xs bg-neutral-200 max-w-[95px] text-black p-1 pl-2 pr-2 grow-0 rounded hover:bg-neutral-300 focus:ring-1 focus:ring-black"
          onClick={handleMarkdownCopy}
        >
          {markdownCopied ? "COPIED!" : "MARKDOWN"}
        </button>
        <button
          type="submit"
          className="text-xs bg-neutral-200 max-w-[95px] text-black p-1 pl-2 pr-2 grow-0 rounded hover:bg-neutral-300 focus:ring-1 focus:ring-black"
          onClick={handleHtmlCopy}
        >
          {htmlCopied ? "COPIED!" : "HTML"}
        </button>
      </div>
    </div>
  );
}
