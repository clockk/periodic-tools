import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import type { Element } from '@/types/element';
import { BottomSheet } from '@/components/ui/bottom-sheet';

interface SelectedElement {
  element: Element;
  quantity: number;
}

interface ConversionToolsProps {
  selectedElements: SelectedElement[];
  onElementRemove: (atomicNumber: number) => void;
  onQuantityChange: (atomicNumber: number, quantity: number) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function ConversionTools({
  selectedElements,
  onElementRemove,
  onQuantityChange,
  isOpen,
  onOpenChange,
  onSave,
}: ConversionToolsProps) {
  const atomPercentages = useMemo(() => {
    const totalAtoms = selectedElements.reduce((sum, { quantity }) => sum + quantity, 0);
    return selectedElements.map(({ element, quantity }) => ({
      element,
      atoms: quantity,
      percentage: (quantity / totalAtoms) * 100,
    }));
  }, [selectedElements]);

  const weightPercentages = useMemo(() => {
    const totalWeight = selectedElements.reduce((sum, { element, quantity }) => {
      return sum + parseFloat(element.atomicWeight) * quantity;
    }, 0);

    return selectedElements.map(({ element, quantity }) => {
      const weight = parseFloat(element.atomicWeight) * quantity;
      return {
        element,
        weight,
        percentage: (weight / totalWeight) * 100,
      };
    });
  }, [selectedElements]);

  const convertedWeightPercentages = useMemo(() => {
    if (selectedElements.length === 0) return [];

    const totalWeight = selectedElements.reduce((sum, { element, quantity }) => {
      const atomicWeight = parseFloat(element.atomicWeight);
      const atomPercentage = (quantity / selectedElements.reduce((s, { quantity: q }) => s + q, 0)) * 100;
      return sum + atomPercentage * atomicWeight;
    }, 0);

    return selectedElements.map(({ element, quantity }) => {
      const atomicWeight = parseFloat(element.atomicWeight);
      const atomPercentage = (quantity / selectedElements.reduce((s, { quantity: q }) => s + q, 0)) * 100;
      const weightPercentage = (atomPercentage * atomicWeight * 100) / totalWeight;

      return {
        element,
        atomPercentage,
        weightPercentage,
      };
    });
  }, [selectedElements]);

  return (
    <BottomSheet open={isOpen} onOpenChange={onOpenChange} title="화합물 조성 계산">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium">원소 입력</h3>
              {selectedElements.map(({ element, quantity }) => (
                <div key={element.atomicNumber} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">
                      {element.name} ({element.symbol})
                    </div>
                    <div className="text-sm text-muted-foreground">원자량: {element.atomicWeight}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onQuantityChange(element.atomicNumber, parseInt(e.target.value) || 0)
                      }
                      className="w-20"
                    />
                    <Button variant="ghost" size="icon" onClick={() => onElementRemove(element.atomicNumber)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {selectedElements.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h3 className="text-lg font-medium mb-4">원자 백분율 (At.%)</h3>
                      <div className="space-y-2">
                        {atomPercentages.map(({ element, atoms, percentage }) => (
                          <div key={element.atomicNumber} className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{element.name}</span>
                                <span className="text-sm text-muted-foreground">{atoms}개</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 mt-1">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                            </div>
                            <span className="w-16 text-right font-medium">{percentage.toFixed(2)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h3 className="text-lg font-medium mb-4">중량 백분율 (Wt.%)</h3>
                      <div className="space-y-2">
                        {convertedWeightPercentages.map(({ element, weightPercentage }) => (
                          <div key={element.atomicNumber} className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{element.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {parseFloat(element.atomicWeight).toFixed(5)}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 mt-1">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${weightPercentage}%` }}
                                />
                              </div>
                            </div>
                            <span className="w-16 text-right font-medium">{weightPercentage.toFixed(2 )}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">총 원자 수</div>
                    <div className="text-2xl font-bold">
                      {selectedElements.reduce((sum, { quantity }) => sum + quantity, 0)}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">총 중량</div>
                    <div className="text-2xl font-bold">
                      {weightPercentages.reduce((sum, { weight }) => sum + weight, 0).toFixed(5)}
                    </div>
                  </div>
                </div>

                <Button onClick={onSave} className="w-full">
                  저장
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
