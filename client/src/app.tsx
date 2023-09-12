import { useState } from "preact/hooks";
import { object, number } from "yup";
import { Badge } from "./components/badge";

const SERVER = import.meta.env.VITE_API_URL || "http://localhost:8080";

const sizeSchema = object({
  size: number()
    .required("Please enter a page size in KB")
    .typeError("Please enter a number")
    .min(1, "Please enter a size between 1 and 99999")
    .max(99999, "Please enter a size between 1 and 99999"),
});

export function App() {
  const [input, setInput] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState<string[]>([]);

  const handleChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setError([]);
    setInput(value);
  };

  const handleGenerate = async (e: Event) => {
    e.preventDefault();
    try {
      await sizeSchema.validate({ size: input });
      setSize(Number(input));
    } catch (err: any) {
      setError(err.errors);
    }
  };

  const colours = [
    "green",
    "red",
    "blue",
    "purple",
    "orange",
    "grey",
    "darkgreen",
    "darkblue",
  ];

  const commonClasses = {
    section:
      "max-w-xl rounded-lg border border-neutral-300 font-sans flex flex-col gap-2 p-7",
    headerText: "leading-7 text-xl",
    text: "leading-7 text",
    smallButton:
      "text-xs bg-neutral-200 text-black p-1 pl-2 pr-2 grow-0 rounded hover:bg-neutral-300 focus:ring-1 focus:ring-black",
  };

  return (
    <>
      <header className="flex gap-3 mb-5">
        <img
          src={`${SERVER}/api/badge/36/darkgreen`}
          alt="Page-size badge"
          style="height: 25px"
        />
      </header>

      <main className="flex flex-col gap-5">
        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>What is page size?</h1>
          <p className={commonClasses.text}>
            A simple API service to generate a concise SVG badge that displays
            the size of a webpage. This initiative is intended to foster
            transparency in web development and promote conscious data usage.
          </p>
        </section>

        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>How does it work?</h1>
          <ul className={commonClasses.text}>
            <li>- Determine the page size using your browser's devtools</li>
            <li>- Convert the size to kilobytes (if in mb: mb * 1000)</li>
            <li>- Click 'Generate'</li>
            <li>- Embed using HTML or Markdown code</li>
          </ul>

          <form onSubmit={handleGenerate} noValidate>
            <div className="flex gap-3 w-full mt-2">
              <div className="w-2/3">
                <input
                  className={`w-full bg-white placeholder:text-gray-800 text-black p-3 rounded-lg border border-grey-100 focus-within:border-black focus:outline-none ${
                    error.length ? "border-red-500" : "border-grey-100"
                  }`}
                  onInput={handleChange}
                  placeholder="Page size in KB"
                />
              </div>
              <div className="w-1/3">
                <button
                  type="submit"
                  className="w-full bg-stone-200 text-black p-3 rounded-lg focus:ring-1 focus:ring-black hover:bg-stone-300"
                >
                  Generate badge
                </button>
              </div>
            </div>
            {error.length > 0 && (
              <p className="text-red-500 mt-4">{error[0]}</p>
            )}
          </form>
        </section>

        <section className={`${commonClasses.section} gap-4`}>
          {colours.map((colour) => (
            <Badge color={colour} size={size} />
          ))}
        </section>

        <section className={commonClasses.section}>
          <h2 className={commonClasses.headerText}>About</h2>
          <p className={commonClasses.text}>
            I wanted to offer an update regarding the current version of the
            site. Originally, I envisioned a tool that would automatically
            determine web page sizes. However, due to significant resource and
            memory usage, I chose a simpler approach.
          </p>
          <p className={commonClasses.text}>
            The current version requires users to manually find the page size
            using their browser's developer console. Though more basic, it still
            allows users to generate badges representing their web page sizes,
            emphasising transparency and mindful data usage.
          </p>
          <p className={commonClasses.text}>
            Want to contribute? Check the{" "}
            <a
              className="text-blue-700 hover:text-blue-400"
              href="https://github.com/cemalokten/page-size"
              target="_blank"
              rel="noopener"
            >
              GitHub repo
            </a>
          </p>
        </section>
      </main>

      <footer className="max-w-xl font-sans flex gap-2 mt-5">
        <span className={`${commonClasses.smallButton} hover:bg-neutral-200`}>
          VERSION 0.2
        </span>
        <a
          href="https://github.com/cemalokten/page-size"
          target="_blank"
          rel="noopener"
          className={commonClasses.smallButton}
        >
          GITHUB
        </a>
        <a
          href="https://cem.al/"
          target="_blank"
          rel="noopener"
          className={commonClasses.smallButton}
        >
          BY @CEMALOKTEN
        </a>
      </footer>
    </>
  );
}
