'use client';

import { ElementCell, EmptyCell } from './element-cell';
import type { Element } from '@/types/element';

interface PeriodicRowProps {
  rowNumber: number;
  elementsByPosition: Record<string, Element>;
  onElementClick: (element: Element) => void;
}

export function PeriodicRow({
  rowNumber,
  elementsByPosition,
  onElementClick,
}: PeriodicRowProps) {
  const getElement = (row: number, column: number) =>
    elementsByPosition[`${row}-${column}`];

  const renderCell = (column: number) => {
    const element = getElement(rowNumber, column);
    return element ? (
      <ElementCell
        key={element.atomicNumber}
        element={element}
        onClick={onElementClick}
      />
    ) : (
      <EmptyCell key={`${rowNumber}-${column}`} />
    );
  };

  const Cells = () => {
    if (rowNumber === 1) {
      return [
        renderCell(1),
        ...Array.from({ length: 16 }, (_, i) => (
          <EmptyCell key={`${rowNumber}-${i + 2}`} />
        )),
        renderCell(18),
      ];
    }

    if (rowNumber === 2 || rowNumber === 3) {
      return [
        renderCell(1),
        renderCell(2),
        ...Array.from({ length: 10 }, (_, i) => (
          <EmptyCell key={`${rowNumber}-${i + 3}`} />
        )),
        ...Array.from({ length: 6 }, (_, i) => renderCell(i + 13)),
      ];
    }

    return Array.from({ length: 18 }, (_, i) => renderCell(i + 1));
  };

  return (
    <div className="periodic-row">
      <Cells />
    </div>
  );
}

interface SpecialRowProps {
  category: string;
  elements: Element[];
  onElementClick: (element: Element) => void;
}

export function SpecialRow({
  category,
  elements,
  onElementClick,
}: SpecialRowProps) {
  const filteredElements = elements
    .filter((el) => el.category === category)
    .sort((a, b) => a.atomicNumber - b.atomicNumber);

  return (
    <div className="periodic-row special-row">
      {filteredElements.map((element) => (
        <ElementCell
          key={element.atomicNumber}
          element={element}
          onClick={onElementClick}
        />
      ))}
    </div>
  );
}
