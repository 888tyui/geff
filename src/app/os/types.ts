export interface AppWindow {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
}

export interface DesktopApp {
  id: string;
  title: string;
  icon: string;
}
