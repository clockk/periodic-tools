'use client';

import { createContext, useState } from 'react';
interface Props {
  initialMode: Mode;
  children: React.ReactNode;
}
export type Mode = 'TABLE' | 'CONVERSION';
export const Context = createContext<{
  mode: Mode;
  toggleMode: () => void;
} | null>(null);

export function ModeContext({ initialMode, children }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const toggleMode = () => setMode(prev => (prev === 'TABLE' ? 'CONVERSION' : 'TABLE'));

  return <Context.Provider value={{ mode, toggleMode }}>{children}</Context.Provider>;
}
