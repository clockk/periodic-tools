'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { getCategoryColorClass } from '@/lib/element-utils';
import type { Element } from '@/types/element';

interface ElementCellProps {
  element: Element;
  onClick: (element: Element) => void;
}

export function ElementCell({ element, onClick }: ElementCellProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className={`element-cell ${getCategoryColorClass(element.category)}`}
          onClick={() => onClick(element)}
          aria-label={`${element.name} (${element.englishName}), atomic number ${element.atomicNumber}`}
        >
          <div className="atomic-number">{element.atomicNumber}</div>
          <div className="symbol">{element.symbol}</div>
          <div className="name">{element.name}</div>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-1">
              {element.symbol}
              <span className="text-sm font-normal text-muted-foreground">#{element.atomicNumber}</span>
            </h3>
            <p className="text-sm">
              {element.name} ({element.englishName})
            </p>
          </div>
          <div
            className={`w-8 h-8 rounded-full ${getCategoryColorClass(
              element.category,
            )} flex items-center justify-center`}
          >
            {element.atomicNumber}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-muted-foreground">Click for more details</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function EmptyCell() {
  return <div className="element-cell empty"></div>;
}
