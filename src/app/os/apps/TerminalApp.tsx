"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const WELCOME = [
  "geffOS Terminal v1.0.0",
  'Type "help" for available commands.',
  "",
];

const NEOFETCH = [
  "         .----.         geff@geffos",
  "        / geff \\        -----------",
  "       |  OS   |        OS: geffOS 1.0.0",
  "        \\ ---- /        Kernel: geff-tumble-6x5",
  "    .----'----'----.    Shell: geffsh 1.0",
  "   /   powered by   \\   Theme: Savanna Gold",
  "  |   meme energy    |  Terminal: geffterm",
  "   \\________________/   CPU: Vibes 9900X",
  "                        RAM: 420.69 GB",
  "                        Disk: infinite GEFF",
];

const MOON_ART = [
  "        🚀",
  "       /|\\",
  "      / | \\",
  "     /  |  \\",
  "    /___|___\\",
  "       / \\",
  "      /   \\",
  "     /  🔥 \\",
  "    /  🔥🔥 \\",
  "   TO THE MOON!",
];

const HODL_QUOTES = [
  "HODL is not just a strategy, it's a lifestyle. 💎🙌",
  "In geff we trust. 🦒",
  "Buy the dip. Which dip? ALL the dips. 📉📈",
  "Patience is the key. Or just forget your password. 🔑",
  "When in doubt, zoom out. 🔭",
  "WAGMI. Probably. Maybe. Definitely. 🎯",
  "Diamond hands don't fold. 💎✋",
  "Not your keys, not your geff. 🗝️",
];

const APP_LIST = [
  "wallet", "gallery", "memes", "roulette", "geff-run",
  "about", "savanna-spins", "crypto-rockets", "golden-geff",
  "terminal", "token-stats", "snake",
];

export default function TerminalApp() {
  const [lines, setLines] = useState<string[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: string[] = [`$ ${cmd}`];

      switch (trimmed) {
        case "help":
          newLines.push(
            "Available commands:",
            "  help      - Show this message",
            "  whoami    - Who are you?",
            "  balance   - Check GEFF balance",
            "  moon      - To the moon!",
            "  hodl      - Motivational quote",
            "  ls        - List geffOS apps",
            "  neofetch  - System info",
            "  clear     - Clear terminal",
            ""
          );
          break;
        case "whoami":
          newLines.push("geff", "");
          break;
        case "balance":
          newLines.push(
            `${(Math.random() * 999999 + 1000).toFixed(2)} GEFF`,
            ""
          );
          break;
        case "moon":
          newLines.push(...MOON_ART, "");
          break;
        case "hodl":
          newLines.push(
            HODL_QUOTES[Math.floor(Math.random() * HODL_QUOTES.length)],
            ""
          );
          break;
        case "ls":
          newLines.push(...APP_LIST.map((a) => `  ${a}`), "");
          break;
        case "neofetch":
          newLines.push(...NEOFETCH, "");
          break;
        case "clear":
          setLines([]);
          return;
        case "":
          break;
        default:
          newLines.push(`geffsh: command not found: ${trimmed}`, "");
      }

      setLines((prev) => [...prev, ...newLines]);
      if (trimmed) {
        setHistory((prev) => [...prev, cmd]);
      }
      setHistoryIdx(-1);
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    }
  };

  return (
    <div
      className="h-full bg-[#0a0a0a] text-green-400 font-mono text-xs p-3 overflow-auto flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre leading-relaxed">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-green-500">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-green-400 animate-pulse" />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
