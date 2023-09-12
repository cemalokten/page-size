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
          src={`${SERVER}/api/badge/65/purple`}
          alt="Page-size badge"
          style="height: 25px"
        />
      </header>

      <main className="flex flex-col gap-5">
        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>What is it?</h1>
          <p className={commonClasses.text}>
            A simple API service that generates an SVG badge that displays the
            size of your webpage. Each badge is less than 1KB.
          </p>
        </section>
        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>Why?</h1>
          <p className={commonClasses.text}>
            I built this to encourage a bit more transparency in web development
            and promote conscious data usage. A bit of optimisation goes along
            way, faster page loads and lower energy consumption are all good
            things. 🌎
          </p>
          <p className={commonClasses.text}>
            Some lightweight things that are awesome:
          </p>
          <ul className={commonClasses.text}>
            <li>→ Feathers</li>
            <li>→ Bubbles</li>
            <li>→ Fluffy clouds</li>
            <li>→ Crisp snowflakes</li>
            <li>→ Superfast websites</li>
          </ul>
          <p className={commonClasses.text}>
            By making web pages lightweight, we not only reduce the digital
            footprint but also create a smoother user experience.
          </p>
        </section>

        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>How does it work?</h1>
          <ul className={commonClasses.text}>
            <li>1. Determine the page size using GTMetrix (see notes)</li>
            <li>2. Convert the size to kilobytes (if in mb: mb * 1000)</li>
            <li>3. Click 'Generate'</li>
            <li>4. Embed using HTML or Markdown code</li>
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
                  Generate
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
            I originally developed the tool to also calculate the size of a
            page, without having to manually enter it. Sadly, this used
            significant resources and memory. To keep in the spirit of the site,
            I decided to go for a simpler, lighter option.
          </p>
          <p className={commonClasses.text}>
            You may have noticed there is no validation or checking of the sizes
            you submit, this is purely an honesty based system.
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
        <section className={commonClasses.section}>
          <h2 className={commonClasses.headerText}>GTMetrix</h2>

          <p className={commonClasses.text}>
            To calculate the size of your web page, follow these steps:
          </p>
          <ul className={commonClasses.text}>
            <li>
              1. Complete a{" "}
              <a
                href="https://gtmetrix.com/"
                target="_blank"
                rel="noopener"
                className="text-blue-700 hover:text-blue-400"
              >
                GTMetrix
              </a>{" "}
              scan on your webpage
            </li>
            <li>
              2. Once complete, click on the <strong>Waterfall</strong> tab
            </li>
            <li>
              3. Note down the <strong>uncompressed</strong> size
            </li>
            <li>4. If it is in MB then convert it to KB. (MB * 1000)</li>
            <li>5. Round up to the nearest KB</li>
          </ul>
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
