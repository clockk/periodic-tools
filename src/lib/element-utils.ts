import type { Category, Element, ElementMap } from "@/types/element"

export function getCategoryColorClass(category: Category): string {
  switch (category) {
    case "alkali metal":
      return "bg-red-100 dark:bg-red-900/30"
    case "alkaline earth metal":
      return "bg-orange-100 dark:bg-orange-900/30"
    case "transition metal":
      return "bg-yellow-100 dark:bg-yellow-900/30"
    case "post-transition metal":
      return "bg-green-100 dark:bg-green-900/30"
    case "metalloid":
      return "bg-blue-100 dark:bg-blue-900/30"
    case "nonmetal":
      return "bg-indigo-100 dark:bg-indigo-900/30"
    case "noble gas":
      return "bg-purple-100 dark:bg-purple-900/30"
    case "lanthanide":
      return "bg-pink-100 dark:bg-pink-900/30"
    case "actinide":
      return "bg-violet-100 dark:bg-violet-900/30"
    default:
      return "bg-gray-100 dark:bg-gray-800"
  }
}

export function createElementPositionMap(elements: Element[]): ElementMap {
  return elements.reduce((acc, element) => {
    if (element.position) {
      const key = `${element.position.row}-${element.position.column}`
      acc[key] = element
    }
    return acc
  }, {} as ElementMap)
}
