"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CELL = 16;
const COLS = 24;
const ROWS = 22;
const W = COLS * CELL;
const H = ROWS * CELL;
const SPEED = 100;

type Dir = "up" | "down" | "left" | "right";
type Pos = { x: number; y: number };

function randomPos(snake: Pos[]): Pos {
  let pos: Pos;
  do {
    pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export default function SnakeGameApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Pos[]>([{ x: 12, y: 11 }]);
  const dirRef = useRef<Dir>("right");
  const nextDirRef = useRef<Dir>("right");
  const foodRef = useRef<Pos>(randomPos([{ x: 12, y: 11 }]));
  const scoreRef = useRef(0);
  const loopRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, W, H);

    // Grid lines (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, H);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(W, y * CELL);
      ctx.stroke();
    }

    // Food
    const food = foodRef.current;
    ctx.fillStyle = "#E88B3A";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL + CELL / 2,
      food.y * CELL + CELL / 2,
      CELL / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = `${CELL - 4}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🦒", food.x * CELL + CELL / 2, food.y * CELL + CELL / 2 + 1);

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      const alpha = 1 - (i / snake.length) * 0.5;
      ctx.fillStyle = isHead
        ? "#E88B3A"
        : `rgba(232,139,58,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL + 1,
        seg.y * CELL + 1,
        CELL - 2,
        CELL - 2,
        isHead ? 4 : 2
      );
      ctx.fill();

      if (isHead) {
        // Glow
        ctx.shadowColor = "#E88B3A";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }, []);

  const gameLoop = useCallback(() => {
    const snake = snakeRef.current;
    dirRef.current = nextDirRef.current;
    const dir = dirRef.current;
    const head = { ...snake[0] };

    switch (dir) {
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      case "left": head.x -= 1; break;
      case "right": head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      setGameState("over");
      setHighScore((prev) => Math.max(prev, scoreRef.current));
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameState("over");
      setHighScore((prev) => Math.max(prev, scoreRef.current));
      return;
    }

    snake.unshift(head);

    // Food check
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      foodRef.current = randomPos(snake);
    } else {
      snake.pop();
    }

    draw();
    loopRef.current = window.setTimeout(gameLoop, SPEED);
  }, [draw]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 12, y: 11 }];
    dirRef.current = "right";
    nextDirRef.current = "right";
    foodRef.current = randomPos([{ x: 12, y: 11 }]);
    scoreRef.current = 0;
    setScore(0);
    setGameState("playing");
    draw();
    loopRef.current = window.setTimeout(gameLoop, SPEED);
  }, [draw, gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = dirRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dir !== "down") nextDirRef.current = "up";
          e.preventDefault();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dir !== "up") nextDirRef.current = "down";
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dir !== "right") nextDirRef.current = "left";
          e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dir !== "left") nextDirRef.current = "right";
          e.preventDefault();
          break;
        case " ":
          e.preventDefault();
          if (gameState !== "playing") startGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimeout(loopRef.current);
    };
  }, [gameState, startGame]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-3">
      {/* Score bar */}
      <div className="flex items-center gap-6 text-xs">
        <span className="text-white/40">
          Score: <span className="text-[#E88B3A] font-bold">{score}</span>
        </span>
        <span className="text-white/40">
          Best: <span className="text-[#E88B3A]/60 font-bold">{highScore}</span>
        </span>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="rounded-lg border border-white/10"
        />

        {/* Overlay for idle/game over */}
        {gameState !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg">
            {gameState === "over" && (
              <p className="text-[#E88B3A] font-bold text-lg mb-1">
                Game Over!
              </p>
            )}
            <p className="text-white/60 text-sm mb-3">
              {gameState === "over"
                ? `Score: ${score}`
                : "🐍 Snake Game"}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-[#E88B3A] text-black rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {gameState === "over" ? "Retry" : "Start"}
            </button>
            <p className="text-white/20 text-[10px] mt-2">
              Arrow keys / WASD to move
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
