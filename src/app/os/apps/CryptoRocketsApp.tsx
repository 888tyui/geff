"use client";

import SlotGame from "../slots/SlotGame";
import { cryptoTheme } from "../slots/themes";

export default function CryptoRocketsApp() {
  return <SlotGame theme={cryptoTheme} />;
}
