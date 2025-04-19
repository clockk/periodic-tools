import { getCategoryColorClass } from '@/lib/element-utils';
import type { Category } from '@/types/element';

const categories: { label: string; value: Category }[] = [
  { label: 'Alkali Metal', value: 'alkali metal' },
  { label: 'Alkaline Earth', value: 'alkaline earth metal' },
  { label: 'Transition Metal', value: 'transition metal' },
  { label: 'Post-Transition', value: 'post-transition metal' },
  { label: 'Metalloid', value: 'metalloid' },
  { label: 'Nonmetal', value: 'nonmetal' },
  { label: 'Noble Gas', value: 'noble gas' },
  { label: 'Lanthanide', value: 'lanthanide' },
  { label: 'Actinide', value: 'actinide' },
];

export function CategoryLegend() {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {categories.map((category) => (
        <div key={category.value} className="flex items-center">
          <div
            className={`w-4 h-4 mr-2 ${getCategoryColorClass(category.value)}`}
          ></div>
          <span className="text-sm">{category.label}</span>
        </div>
      ))}
    </div>
  );
}
