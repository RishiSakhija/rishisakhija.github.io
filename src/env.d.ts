/// <reference types="astro/client" />

declare global {
  interface Window {
    initTerminal: () => void;
    initNetworkAnimation: () => void;
    terminalAnimation: TerminalAnimation | undefined;
    transitionController: TransitionController | undefined;
  }
}

class TerminalAnimation {
  destroy(): void;
}

class TransitionController {
  // transition controller class
}

export {};