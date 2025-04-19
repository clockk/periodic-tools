export type Category =
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'nonmetal'
  | 'noble gas'
  | 'lanthanide'
  | 'actinide';

export interface ElementPosition {
  row: number;
  column: number;
}

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  englishName: string;
  atomicWeight: string;
  category: Category;
  electronConfiguration: string;
  position?: ElementPosition;
  density?: number;
  meltingPoint?: number;
  yearDiscovered?: number;
}

export interface ElementMap {
  [key: string]: Element;
}
