import { useState, useEffect } from "preact/hooks";
import { object, string } from "yup";
import { Badge } from "./components/badge";
import { get_size_only } from "./api/get-size-badge";

const SERVER = import.meta.env.VITE_API_URL || "http://localhost:8080";

const addHttpPrefix = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const urlSchema = object({
  url: string().url().required(),
});

export function App() {
  const [url, setURL] = useState("");
  const [currentURL, setCurrentURL] = useState("");
  const [validatedURL, setValidatedURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [pageSize, setPageSize] = useState(0);

  const handleChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setError([]);
    setURL(value);
  };

  const handleGenerate = async (e: Event) => {
    e.preventDefault();
    if (currentURL !== url) {
      const prefixedURL = addHttpPrefix(url);
      try {
        await urlSchema.validate({ url: prefixedURL });
        setCurrentURL(url);
        setValidatedURL(encodeURIComponent(prefixedURL));
      } catch (err: any) {
        setError(err.errors);
      }
    }
  };

  useEffect(() => {
    const fetchSize = async () => {
      if (!validatedURL || error.length) return;
      try {
        setIsLoading(true);
        const size = await get_size_only({ URL: validatedURL });
        setPageSize(size);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSize();
  }, [validatedURL]);

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
          src={`${SERVER}/api/badge/400/darkblue`}
          alt="Page-size badge"
          style="height: 25px"
        />
      </header>
      <main className="flex flex-col gap-5">
        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>What is page size?</h1>
          <p className={commonClasses.text}>
            A simple service to generate a small SVG badge that displays the
            size of any webpage in kilobytes. With the aim of bringing
            transparency to web development while encouraging mindful data
            usage.
          </p>
        </section>

        <section className={commonClasses.section}>
          <h1 className={commonClasses.headerText}>How does it work?</h1>
          <ul className={commonClasses.text}>
            <li>- Input a URL</li>
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
                  placeholder="Enter URL"
                />
              </div>
              <div className="w-1/3">
                <button
                  type="submit"
                  className="w-full bg-stone-200 text-black p-3 rounded-lg focus:ring-1 focus:ring-black hover:bg-stone-300"
                >
                  {isLoading ? "Loading..." : "Generate"}
                </button>
              </div>
            </div>
            {error.length > 0 && (
              <p className="text-red-500 mt-4">Please enter a valid URL</p>
            )}
          </form>
        </section>

        <section className={`${commonClasses.section} gap-4`}>
          {colours.map((colour) => (
            <Badge
              validatedURL={validatedURL}
              color={colour}
              pageSize={pageSize}
            />
          ))}
        </section>

        <section className={commonClasses.section}>
          <h2 className={commonClasses.headerText}>About</h2>
          <ul className={commonClasses.text}>
            <li>- Badges auto-update every 30 days</li>
            <li>- Manually recheck anytime</li>
            <li>
              - Page sizes are cached to minimize requests and conserve data
            </li>
            <li>
              - This is a work in progress. Some sites may present issues.
            </li>
            <li>
              - Want to contribute? Check the{" "}
              <a
                className="text-blue-700 hover:text-blue-400"
                href="https://github.com/cemalokten/page-size"
                target="_blank"
                rel="noopener"
              >
                GitHub repo
              </a>
            </li>
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
