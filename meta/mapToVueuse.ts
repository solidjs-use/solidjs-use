export const VueUseToSolidJSUse: Record<string, string> = {
  createGlobalState: '❌', // 功能同内置 API `createRoot`
  createInjectionState: '❌', // 功能同内置 API `useContext`
  useDebouncedRefHistory: 'useDebouncedHistoryTravel',
  useManualRefHistory: 'useManualHistoryTravel',
  useRefHistory: 'useHistoryTravel',
  useThrottledRefHistory: 'useThrottledHistoryTravel',
  useTransition: 'useCssTransition',
  computedInject: '❌', // solidjs 中对应 `useContext` + `useMemo` 就可以搞定，没必要
  templateRef: '❌', // 即能读又能写，需要一个对象的属性借助 get、set 实现，在 solidjs 场景下不太好实现，vue 可以使用 `.value` 属性
  tryOnBeforeMount: '❌', // solidjs 没有 onBeforeMount 钩子函数，但其实 `createRenderEffect` 相当于 `onBeforeMount`
  tryOnBeforeUnmount: '❌', // solidjs 没有 onBeforeUnmount 钩子函数
  tryOnMounted: 'tryOnMount',
  tryOnScopeDispose: '❌', // solidjs 中 scopeDispose 就是用的 onCleanup，没有分是否在 hooks 场景
  tryOnUnmounted: 'tryOnCleanup',
  unrefElement: 'unAccessor',
  useCurrentElement: '❌', // 此方法依赖了 `getCurrentInstance` 这个 Vue 方法，solidjs 并未提供类似方法
  useTemplateRefsList: '❌', // solidjs 中 ref 指定的元素删除后，并没提供删除的回调，无法实现此方法类似效果
  useVModel: '❌', // 使用到了 vue 自身的概念，emit 和直接通过 .value 修改值，在 solidjs 这不成立，还是需要 [value, setValue] 两者配合
  useVModels: '❌', // 同上
  computedAsync: 'createAsyncMemo',
  computedEager: '❌', // solidjs 不能掌握 effect 的回调时机
  computedWithControl: '❌', // 内部依赖了 Object.defineProperty 对 value 属性的定义，solidjs 没有
  extendRef: '❌', // 不适合，依赖了 .value 的能力
  reactiveOmit: 'OmitMutable',
  reactivePick: 'pickMutable',
  reactiveComputed: 'mutableMemo',
  refAutoReset: 'signalAutoReset',
  refDebounced: 'accessorDebounced',
  refDefault: 'accessorDefault',
  refThrottled: 'accessorThrottled',
  refWithControl: '❌', // 使用了到 vue 的 customRef API，其能力 solidjs 无法做到
  resolveRef: 'resolveAccessor',
  resolveUnref: 'unAccessor',
  syncRef: 'syncSignal',
  syncRefs: 'toSignals',
  toRefs: '❌', // 不太好解决 set 的问题
  createUnrefFn: 'createUnAccessorFn',
  useCached: '❌', // createSignal 第二个 options 就提供一样的功能
  useToFixed: '❌', // VueUse 已标识为废弃
  watch: 'new'
}

export const SolidJSUseToVueUse: Record<string, string> = Object.keys(VueUseToSolidJSUse).reduce<
  Record<string, string>
>((acc, key) => {
  const val = VueUseToSolidJSUse[key]
  acc[val] = key
  return acc
}, {})
