'use client';

import { useState, useMemo, useCallback } from 'react';
import { CategoryLegend } from './components/periodic-table/category-legend';
import { ElementDetails } from './components/periodic-table/element-details';
import { PeriodicRow, SpecialRow } from './components/periodic-table/periodic-row';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { createElementPositionMap } from '@/lib/element-utils';
import { elements } from '@/statics/periodicTableData';
import { ModeToggle } from '@/components/ui/mode-toggle';
import type { Element } from '@/types/element';

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const elementsByPosition = useMemo(() => createElementPositionMap(elements), []);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };
  const closeDialog = () => {
    setSelectedElement(null);
  };

  const Rows = useCallback(
    () =>
      Array.from({ length: 7 }, (_, i) => (
        <PeriodicRow
          key={`row-${i + 1}`}
          rowNumber={i + 1}
          elementsByPosition={elementsByPosition}
          onElementClick={handleElementClick}
        />
      )),
    [],
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Periodic Tools</h1>
        <div className="flex gap-1">
          <ModeToggle />
          <ThemeToggle />
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="periodic-table">
          <Rows />
          <div className="spacer" />
          <SpecialRow category="lanthanide" elements={elements} onElementClick={handleElementClick} />
          <SpecialRow category="actinide" elements={elements} onElementClick={handleElementClick} />
        </div>
      </div>

      <CategoryLegend />
      <ElementDetails
        element={selectedElement}
        open={selectedElement !== null}
        onOpenChange={open => !open && closeDialog()}
      />
    </div>
  );
}
