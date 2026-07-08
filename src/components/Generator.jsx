import { useState, useCallback, useEffect } from "react";
import { FaCopy, FaRedoAlt, FaLock } from "react-icons/fa";

function Generator() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [copied, setCopied] = useState(false);

  const generateString = useCallback(() => {
    let characters = "";

    if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) characters += "0123456789";
    if (symbols) characters += "!@#$%^&*()_+-={}[]<>?/";

    if (!characters) {
      setRandomString("Please select at least one option.");
      return;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setRandomString(result);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomString);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
    return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8 w-full max-w-4xl">

        <h1 className="text-4xl lg:text-5xl font-bold flex justify-center items-center gap-4 mb-8">
          <FaLock className="text-blue-600" />
          Random String Generator
        </h1>

        <p className="text-center text-gray-500 mb-8">
            Generate secure random strings instantly using React Hooks.
        </p>
        <div className="mb-6">

          <div className="flex justify-between mb-2">

            <span className="font-semibold text-xl">
              String Length
            </span>

            <span className="font-bold text-blue-600 text-xl">
              {length}
            </span>

          </div>

          <input
            type="range"
            min="4"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />

        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">

          <label className="flex items-center gap-3 text-lg">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
            Uppercase
          </label>

          <label className="flex items-center gap-3 text-lg">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
            Lowercase
          </label>

          <label className="flex items-center gap-3 text-lg">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-3 text-lg">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            Symbols
          </label>

        </div>

        <div className="flex gap-4">

          <button
            onClick={generateString}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex justify-center items-center gap-3"
          >
            <FaRedoAlt />
            Generate String
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <FaCopy size={20} />
          </button>

        </div>

        <div className="mt-8 bg-gray-100 rounded-2xl p-6 border">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">
              Generated String
            </h2>

            {copied && (
              <span className="text-green-600 font-semibold">
                 ✅ Copied Successfully!
              </span>
            )}

          </div>

          <div className="bg-white rounded-xl border p-4 transition-all duration-300 hover:shadow-lg">

            <p className="font-mono text-2xl break-all text-blue-700">
              {randomString}
            </p>

          </div>

          <p className="text-right mt-3 text-gray-500">
            Characters : {randomString.length}
          </p>

        </div>

        <p className="text-center text-gray-500 mt-8">
          Developed by Juveriya Khan | React + Tailwind CSS
        </p>

      </div>

    </div>
  );
}

export default Generator;