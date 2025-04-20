import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Element } from '@/types/element';

interface ElementDetailsProps {
  element: Element | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElementDetails({ element, open, onOpenChange }: ElementDetailsProps) {
  if (!element) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl font-bold">{element.symbol}</span>
            <span className="text-xl">{element.name}</span>
            <span className="text-sm text-muted-foreground ml-auto">#{element.atomicNumber}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <p className="text-sm font-medium">원자량 (Atomic Weight)</p>
            <p>{element.atomicWeight}</p>
          </div>
          <div>
            <p className="text-sm font-medium">분류 (Category)</p>
            <p>{element.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium">전자 배치 (Electron Config)</p>
            <p className="text-sm">{element.electronConfiguration}</p>
          </div>
          <div>
            <p className="text-sm font-medium">발견 연도 (Year)</p>
            <p>{element.yearDiscovered || 'Ancient'}</p>
          </div>
          {element.density && (
            <div>
              <p className="text-sm font-medium">밀도 (Density)</p>
              <p>{element.density} g/cm³</p>
            </div>
          )}
          {element.meltingPoint && (
            <div>
              <p className="text-sm font-medium">녹는점 (Melting Point)</p>
              <p>{element.meltingPoint} K</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
