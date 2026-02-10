"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad2 } from "lucide-react";

const CANVAS_W = 400;
const CANVAS_H = 300;
const GEFF_SIZE = 30;
const OBSTACLE_W = 30;
const OBSTACLE_GAP = 120;
const GRAVITY = 0.5;
const JUMP_FORCE = -8;
const SPEED = 3;

interface GameState {
  geffY: number;
  velocity: number;
  obstacles: { x: number; gapY: number }[];
  score: number;
  gameOver: boolean;
  started: boolean;
}

export default function RandomGameApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState>({
    geffY: CANVAS_H / 2,
    velocity: 0,
    obstacles: [],
    score: 0,
    gameOver: false,
    started: false,
  });
  const animRef = useRef<number>(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const drawGeff = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "#E88B3A";
    ctx.beginPath();
    ctx.arc(x, y, GEFF_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0D0906";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("G", x, y + 5);
    ctx.textAlign = "start";
  };

  const resetGame = useCallback(() => {
    gameRef.current = {
      geffY: CANVAS_H / 2,
      velocity: 0,
      obstacles: [],
      score: 0,
      gameOver: false,
      started: true,
    };
    setDisplayScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.gameOver) {
      resetGame();
      return;
    }
    if (!g.started) {
      resetGame();
      return;
    }
    g.velocity = JUMP_FORCE;
  }, [resetGame]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = gameRef.current;

    if (!g.started || g.gameOver) {
      // Draw static screen
      ctx.fillStyle = "#0D0906";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Ground
      ctx.fillStyle = "#2A1F15";
      ctx.fillRect(0, CANVAS_H - 30, CANVAS_W, 30);

      // Geff
      drawGeff(ctx, CANVAS_W / 2, CANVAS_H / 2);

      ctx.fillStyle = "#E88B3A";
      ctx.font = "bold 18px 'Cimo Ones', sans-serif";
      ctx.textAlign = "center";

      if (g.gameOver) {
        ctx.fillText("Game Over!", CANVAS_W / 2, CANVAS_H / 2 - 50);
        ctx.fillStyle = "#FFF8F0";
        ctx.font = "14px sans-serif";
        ctx.fillText(`Score: ${g.score}`, CANVAS_W / 2, CANVAS_H / 2 - 25);
        ctx.fillText("Click or Space to retry", CANVAS_W / 2, CANVAS_H / 2 + 50);
      } else {
        ctx.fillText("geff run", CANVAS_W / 2, CANVAS_H / 2 - 50);
        ctx.fillStyle = "#FFF8F0";
        ctx.font = "12px sans-serif";
        ctx.fillText("Click or press Space to start", CANVAS_W / 2, CANVAS_H / 2 + 50);
      }
      ctx.textAlign = "start";
      animRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Update physics
    g.velocity += GRAVITY;
    g.geffY += g.velocity;

    // Ground/ceiling collision
    if (g.geffY > CANVAS_H - 30 - GEFF_SIZE / 2) {
      g.gameOver = true;
      setGameOver(true);
      if (g.score > highScore) setHighScore(g.score);
    }
    if (g.geffY < GEFF_SIZE / 2) {
      g.geffY = GEFF_SIZE / 2;
      g.velocity = 0;
    }

    // Spawn obstacles
    if (g.obstacles.length === 0 || g.obstacles[g.obstacles.length - 1].x < CANVAS_W - 200) {
      g.obstacles.push({
        x: CANVAS_W + 50,
        gapY: 60 + Math.random() * (CANVAS_H - 150),
      });
    }

    // Update obstacles
    g.obstacles = g.obstacles.filter((o) => o.x > -OBSTACLE_W);
    for (const o of g.obstacles) {
      o.x -= SPEED;

      // Score
      if (Math.abs(o.x - CANVAS_W / 4) < SPEED) {
        g.score++;
        setDisplayScore(g.score);
      }

      // Collision
      const geffX = CANVAS_W / 4;
      if (
        geffX + GEFF_SIZE / 2 > o.x &&
        geffX - GEFF_SIZE / 2 < o.x + OBSTACLE_W
      ) {
        if (g.geffY - GEFF_SIZE / 2 < o.gapY || g.geffY + GEFF_SIZE / 2 > o.gapY + OBSTACLE_GAP) {
          g.gameOver = true;
          setGameOver(true);
          if (g.score > highScore) setHighScore(g.score);
        }
      }
    }

    // Draw
    ctx.fillStyle = "#0D0906";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Stars
    ctx.fillStyle = "#FFF8F0";
    for (let i = 0; i < 20; i++) {
      const sx = ((i * 73 + g.obstacles.length * 2) % CANVAS_W);
      const sy = (i * 37) % (CANVAS_H - 50);
      ctx.fillRect(sx, sy, 1, 1);
    }

    // Ground
    ctx.fillStyle = "#2A1F15";
    ctx.fillRect(0, CANVAS_H - 30, CANVAS_W, 30);
    ctx.fillStyle = "#8B5E3C";
    ctx.fillRect(0, CANVAS_H - 30, CANVAS_W, 2);

    // Obstacles
    for (const o of g.obstacles) {
      // Top pipe
      ctx.fillStyle = "#8B5E3C";
      ctx.fillRect(o.x, 0, OBSTACLE_W, o.gapY);
      ctx.fillStyle = "#E88B3A";
      ctx.fillRect(o.x - 3, o.gapY - 8, OBSTACLE_W + 6, 8);

      // Bottom pipe
      ctx.fillStyle = "#8B5E3C";
      ctx.fillRect(o.x, o.gapY + OBSTACLE_GAP, OBSTACLE_W, CANVAS_H - o.gapY - OBSTACLE_GAP);
      ctx.fillStyle = "#E88B3A";
      ctx.fillRect(o.x - 3, o.gapY + OBSTACLE_GAP, OBSTACLE_W + 6, 8);
    }

    // Geff
    drawGeff(ctx, CANVAS_W / 4, g.geffY);

    // Score
    ctx.fillStyle = "#E88B3A";
    ctx.font = "bold 20px 'Cimo Ones', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(g.score), CANVAS_W / 2, 35);
    ctx.textAlign = "start";

    animRef.current = requestAnimationFrame(gameLoop);
  }, [highScore]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(gameLoop);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [gameLoop, jump]);

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3 self-start w-full">
        <Gamepad2 className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          geff Run
        </h2>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <span className="text-white/40">
            Score: <span className="text-[#E88B3A]">{displayScore}</span>
          </span>
          <span className="text-white/40">
            Best: <span className="text-[#F5C563]">{highScore}</span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={jump}
          className="rounded-xl border border-white/10 cursor-pointer"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <p className="text-white/30 text-[10px] mt-2">
        {gameOver
          ? "Click or press Space to retry"
          : started
          ? "Click or press Space to jump"
          : "Click or press Space to start"}
      </p>
    </div>
  );
}
