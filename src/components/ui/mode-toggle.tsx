'use client';

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { TableIcon, ArrowLeftRightIcon } from 'lucide-react';
import { Context as ModeContext } from '../providers/mode-context';

export function ModeToggle() {
  const context = use(ModeContext);
  if (!context) throw new Error('ModeContext not found');
  const { mode, toggleMode } = context;

  return (
    <Button variant="outline" size="icon" onClick={toggleMode} aria-label={'Switch to mode'}>
      {mode === 'CONVERSION' ? <TableIcon className="h-5 w-5" /> : <ArrowLeftRightIcon className="h-5 w-5" />}
    </Button>
  );
}
