import _metadata, { categories as _categories, functions as _functions } from './index.json'
import { SolidJSUseToVueUse, VueUseToSolidJSUse } from './mapToVueuse'
import type { PackageIndexes, SolidJSUseFunction } from './types'

const categoriesOrder = [
  'State',
  'Elements',
  'Browser',
  'Sensors',
  'Network',
  'Animation',
  'Component',
  'Watch',
  'Reactivity',
  'Array',
  'Time',
  'Utilities'
]

export const metadata = _metadata as PackageIndexes
export const functions = _functions as PackageIndexes['functions']
export const categories = _categories

export const functionNames = functions.map(f => f.name)
export const categoryNames = Array.from(categories)
  .sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))
  .sort((a, b) => (a.startsWith('@') ? 1 : b.startsWith('@') ? -1 : 0))
export const coreCategoryNames = categoryNames.filter(f => !f.startsWith('@'))
export const addonCategoryNames = categoryNames.filter(f => f.startsWith('@'))
export const categoryFunctions = functions
  .filter(item => item.category)
  .reduce<Record<string, SolidJSUseFunction[]>>((acc, functionInfo) => {
    const category = functionInfo.category!
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(functionInfo)
    return acc
  }, {})

export const getFunction = (name: string) => metadata.functions.find(f => f.name === name)
export const getVueFunctionName = (name: string) =>
  VueUseToSolidJSUse[name] === 'new' ? undefined : SolidJSUseToVueUse[name] ? SolidJSUseToVueUse[name] : name
