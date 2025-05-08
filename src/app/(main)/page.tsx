'use client';

import { useState, useMemo, useCallback, use } from 'react';
import { CategoryLegend } from './components/periodic-table/category-legend';
import { ElementDetails } from './components/periodic-table/element-details';
import { PeriodicRow, SpecialRow } from './components/periodic-table/periodic-row';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { createElementPositionMap } from '@/lib/element-utils';
import { elements } from '@/statics/periodicTableData';
import { ModeToggle } from '@/components/ui/mode-toggle';
import type { Element } from '@/types/element';
import { Context as ModeContext } from '@/components/providers/mode-context';
import { ConversionTools } from './components/conversion/conversion-tools';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SelectedElement {
  element: Element;
  quantity: number;
}

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isCompoundsSheetOpen, setIsCompoundsSheetOpen] = useState(false);
  const [compounds, setCompounds] = useState<SelectedElement[][]>([]);
  const elementsByPosition = useMemo(() => createElementPositionMap(elements), []);
  const { mode } = use(ModeContext)!;

  const handleElementClick = useCallback(
    (element: Element) => {
      const updateSelectedElements = (updatedElements: SelectedElement[]) => {
        setSelectedElements(updatedElements);
        setIsBottomSheetOpen(true);
      };

      if (mode === 'TABLE') {
        setSelectedElement(element);
        return;
      }

      const existingElement = selectedElements.find(item => item.element.atomicNumber === element.atomicNumber);
      if (existingElement) {
        updateSelectedElements(
          selectedElements.map(item =>
            item.element.atomicNumber === element.atomicNumber ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      } else {
        updateSelectedElements([...selectedElements, { element, quantity: 1 }]);
      }
    },
    [mode, selectedElements],
  );

  const handleElementRemove = (atomicNumber: number) => {
    setSelectedElements(prev => prev.filter(item => item.element.atomicNumber !== atomicNumber));
    if (selectedElements.length <= 1) {
      setIsBottomSheetOpen(false);
    }
  };

  const handleQuantityChange = (atomicNumber: number, quantity: number) => {
    if (quantity < 1) {
      handleElementRemove(atomicNumber);
      return;
    }
    setSelectedElements(prev =>
      prev.map(item => (item.element.atomicNumber === atomicNumber ? { ...item, quantity } : item)),
    );
  };

  const handleSaveCompound = () => {
    if (selectedElements.length > 0) {
      setCompounds(prev => [...prev, [...selectedElements]]);
      setSelectedElements([]);
      setIsBottomSheetOpen(false);
    }
  };

  const handleRemoveCompound = (index: number) => {
    setCompounds(prev => prev.filter((_, i) => i !== index));
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
    [elementsByPosition, handleElementClick],
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Periodic Tools</h1>
        <div className="flex gap-1">
          <ModeToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="overflow-x-auto pb-4">
        <div className="periodic-table">
          <Rows />
          <div className="spacer" />
          <SpecialRow category="lanthanide" elements={elements} onElementClick={handleElementClick} />
          <SpecialRow category="actinide" elements={elements} onElementClick={handleElementClick} />
        </div>
      </main>

      {mode === 'TABLE' ? (
        <CategoryLegend />
      ) : (
        <>
          <ConversionTools
            selectedElements={selectedElements}
            onElementRemove={handleElementRemove}
            onQuantityChange={handleQuantityChange}
            isOpen={isBottomSheetOpen}
            onOpenChange={setIsBottomSheetOpen}
            onSave={handleSaveCompound}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">저장된 화합물: {compounds.length}개</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsCompoundsSheetOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>목록</span>
              </Button>
            </div>
          </div>
          <BottomSheet open={isCompoundsSheetOpen} onOpenChange={setIsCompoundsSheetOpen} title="저장된 화합물">
            <div className="p-4 space-y-4">
              {compounds.map((compound, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">화합물 {index + 1}</h3>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveCompound(index)}>
                      삭제
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    {compound.map(({ element, quantity }) => (
                      <div key={element.atomicNumber} className="flex justify-between text-sm">
                        <span>
                          {element.name} ({element.symbol})
                        </span>
                        <span>{quantity}개</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {compounds.length === 0 && (
                <div className="text-center text-muted-foreground py-8">저장된 화합물이 없습니다.</div>
              )}
            </div>
          </BottomSheet>
        </>
      )}

      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          open={Boolean(selectedElement)}
          onOpenChange={open => setSelectedElement(open ? selectedElement : null)}
        />
      )}
    </div>
  );
}
