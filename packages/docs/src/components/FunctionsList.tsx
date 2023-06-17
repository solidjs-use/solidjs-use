import Fuse from 'fuse.js'
import { AiOutlineDelete } from 'solid-icons/ai'
import { FiSearch } from 'solid-icons/fi'
import { TbExternalLink } from 'solid-icons/tb'
import { createMemo, For, Show } from 'solid-js'
import { useEventListener } from '../../../core/src/useEventListener'
import { useUrlSearchParams } from '../../../core/src/useUrlSearchParams'
import { addonCategoryNames, categoryNames, coreCategoryNames, functions } from '../../../../meta'
import { renderMarkdown } from '../utils'

const preFix = '/solidjs-use'

const FunctionsList = () => {
  const sortMethods = ['category', 'name', 'updated']

  useEventListener('click', e => {
    if ((e.target as any).tagName === 'A') window.dispatchEvent(new Event('hashchange'))
  })

  const [query, setQuery] = useUrlSearchParams('hash-params', { removeFalsyValues: true })
  const showCategory = createMemo(() => !query().search && (!query().sortMethod || query().sortMethod === 'category'))
  const items = createMemo(() => {
    let fn = functions.filter(i => !i.internal)
    if (query().component) fn = fn.filter(i => i.component)
    if (query().directive) fn = fn.filter(i => i.directive)
    if (!query().category) return fn
    return fn.filter(item => item.category === query().category)
  })

  const fuse = createMemo(
    () =>
      new Fuse(items(), {
        keys: ['name', 'description']
      })
  )
  const result = createMemo(() => {
    if (query().search) {
      return fuse()
        .search(String(query().search))
        .map(i => i.item)
    }
    const fns = [...items()]
    if (query().sortMethod === 'updated') fns.sort((a, b) => b.lastUpdated ?? 0 - (a.lastUpdated ?? 0))
    else if (query().sortMethod === 'name') fns.sort((a, b) => a.name.localeCompare(b.name))
    else fns.sort((a, b) => categoryNames.indexOf(a.category ?? '') - categoryNames.indexOf(b.category ?? ''))
    return fns
  })

  const hasFilters = createMemo(() =>
    Boolean(query().search || query().category || query().component || query().sortMethod)
  )

  function resetFilters () {
    setQuery({
      sortMethod: '',
      category: '',
      component: '',
      search: ''
    })
  }
  function toggleCategory (cate: string) {
    setQuery(({ ...newQuery }) => ({
      ...newQuery,
      category: newQuery.category === cate ? '' : cate
    }))
  }
  function toggleSort (method: string) {
    setQuery(({ ...newQuery }) => ({
      ...newQuery,
      sortMethod: method
    }))
  }

  function styledName (name: string) {
    if (name.startsWith('use')) {
      return (
        <>
          {' '}
          <span opacity="70">use</span>
          {name.slice(3)}
        </>
      )
    }
    if (name.startsWith('try')) {
      return (
        <>
          {' '}
          <span opacity="70">try</span>
          {name.slice(3)}
        </>
      )
    }
    if (name.startsWith('on')) {
      return (
        <>
          {' '}
          <span opacity="70">on</span>
          {name.slice(2)}
        </>
      )
    }
    return name
  }
  return (
    <>
      <style>
        {`
        a {
          color: var(--hope-colors-primary9);
        }
        .select-button {
          border-radius: .25rem;
          background-color: #9ca3af0d;
          padding: .125rem .5rem;
          font-size: .875rem;
          line-height: 1.25rem;

        }

        .select-button.active {
          background-color: #3eaf7c0d;
          --un-text-opacity: 1;
          color: var(--hope-colors-primary9);
        }
        `}
      </style>
      <div class="grid grid-cols-[80px_auto] gap-y-2 mt-10">
        <div opacity="80" text="sm">
          Core
        </div>
        <div flex="~ wrap" gap="2" m="b-2">
          <For each={coreCategoryNames}>
            {cate => (
              <button
                class="select-button"
                classList={{ active: query().category === cate }}
                onClick={() => toggleCategory(cate)}
              >
                {cate}
              </button>
            )}
          </For>
        </div>
        <div opacity="80" text="sm">
          Add-ons
        </div>
        <div flex="~ wrap" gap="2" m="b-2">
          <For each={addonCategoryNames}>
            {cate => (
              <button
                class="select-button"
                classList={{ active: query().category === cate }}
                onClick={() => toggleCategory(cate)}
              >
                {cate}
              </button>
            )}
          </For>
        </div>
        <div opacity="80" text="sm">
          Sort by
        </div>
        <div flex="~ wrap" gap="2" m="b-2">
          <Show when={query().search}>
            <button class="select-button active">Search</button>
          </Show>
          <For each={sortMethods}>
            {method => (
              <button
                class="select-button capitalize"
                classList={{ active: method === (query().sortMethod || 'category') }}
                onClick={() => toggleSort(method)}
              >
                {method}
              </button>
            )}
          </For>
        </div>
        {/* <div opacity="80" text="sm">
        Filters
      </div>
      <div flex="~ gap-4">
        <CheckboxLabel class="checkbox">
          <Input checked={!!query().component} onChange={() => query().component = (!query().component) as any} type="checkbox" />
          <CheckboxSpan>Has Component</CheckboxSpan>
        </CheckboxLabel>
        <CheckboxLabel class="checkbox">
          <Input checked={!!query().directive} onChange={() => query().directive = (!query().directive) as any} type="checkbox" />
          <CheckboxSpan>Has Directive</CheckboxSpan>
        </CheckboxLabel>
      </div> */}
      </div>
      <div h="1px" bg="$vp-c-divider-light" m="t-4" />
      <div flex="~" class="children:my-auto" p="2">
        <FiSearch style={{ 'margin-right': '0.5rem', opacity: '0.5' }} />
        <input
          value={query().search || ''}
          onInput={e => (query().search = e.currentTarget.value)}
          class="w-full"
          type="text"
          role="search"
          placeholder="Search..."
        />
      </div>
      <div h="1px" bg="$vp-c-divider-light" m="b-4" />
      <div flex="~ col" gap="2" class="relative" p="t-5">
        <Show when={hasFilters()}>
          <div class="transition mb-2 opacity-60 absolute -top-3 right-0 z-10">
            <button class="select-button flex gap-1 items-center !px-2 !py-1" onClick={resetFilters}>
              <AiOutlineDelete />
              Clear Filters
            </button>
          </div>
        </Show>

        <For each={result()}>
          {(fn, idx) => (
            <>
              {' '}
              <Show when={showCategory() && fn.category !== result()[idx() - 1]?.category}>
                <h3 opacity="60" class="!text-16px !tracking-wide !m-0" p="y-2">
                  {fn.category}
                </h3>
              </Show>
              <div text="sm" flex="~ gap1" items-center classList={{ 'op80 saturate-0': fn.deprecated }}>
                <a
                  href={fn.external ? fn.external : `${preFix}/${fn.package}/${fn.name}/`}
                  target={fn.external ? '_blank' : undefined}
                  bg="gray-400/5"
                  p="x-1.5 y-0.5"
                  class="rounded items-center"
                  flex="inline gap-1 none"
                  my-auto
                  classList={{ 'line-through !decoration-solid': fn.deprecated }}
                >
                  <span>{styledName(fn.name)}</span>
                  <Show when={fn.external}>
                    <TbExternalLink class="opacity-80 text-xs" />
                  </Show>
                </a>
                <span class="op50">-</span>
                <span class="whitespace-wrap" innerHTML={renderMarkdown(fn.description)} />
              </div>
            </>
          )}
        </For>
        <Show when={result().length === 0}>
          <div text-center pt-6>
            <div m2 op50>
              No result matched
            </div>
            <button class="select-button flex-inline gap-1 items-center !px-2 !py-1" onClick={resetFilters}>
              <AiOutlineDelete />
              Clear Filters
            </button>
          </div>
        </Show>
      </div>
    </>
  )
}

export default FunctionsList
