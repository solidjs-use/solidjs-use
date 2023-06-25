import { useFuse, type UseFuseOptions } from '@solidjs-use/integrations/useFuse'
import { FaSolidAngleDown } from 'solid-icons/fa'
import { RiSystemFilter2Line } from 'solid-icons/ri'
import { createEffect, createMemo, createSignal, For, on, Show } from 'solid-js'

interface DataItem {
  firstName: string
  lastName: string
}

const Demo = () => {
  const [data] = createSignal<DataItem[]>([
    {
      firstName: 'Roslyn',
      lastName: 'Mitchell'
    },
    {
      firstName: 'Cathleen',
      lastName: 'Matthews'
    },
    {
      firstName: 'Carleton',
      lastName: 'Harrelson'
    },
    {
      firstName: 'Allen',
      lastName: 'Moores'
    },
    {
      firstName: 'John',
      lastName: 'Washington'
    },
    {
      firstName: 'Brooke',
      lastName: 'Colton'
    },
    {
      firstName: 'Mary',
      lastName: 'Rennold'
    },
    {
      firstName: 'Nanny',
      lastName: 'Field'
    },
    {
      firstName: 'Chasity',
      lastName: 'Michael'
    },
    {
      firstName: 'Oakley',
      lastName: 'Giles'
    },
    {
      firstName: 'Johanna',
      lastName: 'Shepherd'
    },
    {
      firstName: 'Maybelle',
      lastName: 'Wilkie'
    },
    {
      firstName: 'Dawson',
      lastName: 'Rowntree'
    },
    {
      firstName: 'Manley',
      lastName: 'Pond'
    },
    {
      firstName: 'Lula',
      lastName: 'Sawyer'
    },
    {
      firstName: 'Hudson',
      lastName: 'Hext'
    },
    {
      firstName: 'Alden',
      lastName: 'Senior'
    },
    {
      firstName: 'Tory',
      lastName: 'Hyland'
    },
    {
      firstName: 'Constance',
      lastName: 'Josephs'
    },
    {
      firstName: 'Larry',
      lastName: 'Kinsley'
    }
  ])

  const [search, setSearch] = createSignal('')
  const [filterBy, setFilterBy] = createSignal('both')
  const keys = createMemo(() => {
    if (filterBy() === 'first') return ['firstName']
    else if (filterBy() === 'last') return ['lastName']
    return ['firstName', 'lastName']
  })
  const [resultLimit, setResultLimit] = createSignal<number | undefined>(undefined)
  const [resultLimitString, setResultLimitString] = createSignal<string>('')
  createEffect(
    on(resultLimitString, () => {
      if (resultLimitString() === '') {
        setResultLimit(undefined)
      } else {
        const float = Number.parseFloat(resultLimitString())
        if (!Number.isNaN(float)) {
          setResultLimit(Math.round(float))
          setResultLimitString(String(resultLimit()))
        }
      }
    })
  )

  const [exactMatch, setExactMatch] = createSignal<boolean>(false)
  const [isCaseSensitive, setCaseSensitive] = createSignal<boolean>(false)
  const [matchAllWhenSearchEmpty, setMatchAllWhenSearchEmpty] = createSignal<boolean>(true)

  const options = createMemo<UseFuseOptions<DataItem>>(() => ({
    fuseOptions: {
      keys: keys(),
      isCaseSensitive: isCaseSensitive(),
      threshold: exactMatch() ? 0 : undefined
    },
    resultLimit: resultLimit(),
    matchAllWhenSearchEmpty: matchAllWhenSearchEmpty()
  }))
  const { results } = useFuse(search, data, options)
  return (
    <>
      <div>
        <input
          value={search()}
          onInput={e => setSearch(e.currentTarget.value)}
          placeholder="Search for someone..."
          type="text"
          w-full
        />
        <div flex flex-wrap>
          <div
            bg="dark:(dark-300) light-700"
            mr-2
            border="1 light-900 dark:(dark-700)"
            rounded
            relative
            flex
            items-center
          >
            <RiSystemFilter2Line class="absolute left-2 opacity-70" />
            <select value={filterBy()} onChange={e => setFilterBy(e.currentTarget.value)} px-8 bg-transparent>
              <option bg="dark:(dark-300) light-700" value="both">
                Full Name
              </option>
              <option bg="dark:(dark-300) light-700" value="first">
                First Name
              </option>
              <option bg="dark:(dark-300) light-700" value="last">
                Last Name
              </option>
            </select>
            <FaSolidAngleDown class="absolute right-2 pointer-events-none opacity-70" />
          </div>
          <span flex-1 />
          <div flex flex-row flex-wrap gap-x-4>
            <label class="checkbox">
              <input checked={exactMatch()} onChange={e => setExactMatch(e.currentTarget.checked)} type="checkbox" />
              <span>Exact Match</span>
            </label>
            <label class="checkbox">
              <input
                checked={isCaseSensitive()}
                onChange={e => setCaseSensitive(e.currentTarget.checked)}
                type="checkbox"
              />
              <span>Case Sensitive</span>
            </label>
            <label class="checkbox">
              <input
                checked={matchAllWhenSearchEmpty()}
                onChange={e => setMatchAllWhenSearchEmpty(e.currentTarget.checked)}
                type="checkbox"
              />
              <span>Match all when empty</span>
            </label>
          </div>
        </div>
        <div mt-4>
          <Show
            when={results().length > 0}
            fallback={
              <div text-center pt-8 pb-4 opacity-80>
                No Results Found
              </div>
            }
          >
            <For each={results()}>
              {result => (
                <div py-2>
                  <div flex flex-col>
                    <span>
                      {result.item.firstName} {result.item.lastName}
                    </span>
                    <span class="opacity-50" text-sm>
                      Score Index: {result.refIndex}
                    </span>
                  </div>
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
      <style>
        {`
input {
    --tw-ring-offset-width: 1px !important;
    --tw-ring-color: #8885 !important;
    --tw-ring-offset-color: transparent !important
}

.checkbox {
    margin-top: auto;
    margin-bottom: auto;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    border-radius: .25rem;
    padding-left: .5rem;
    padding-right: .5rem
}

.checkbox input {
    appearance: none;
    padding: 0;
    margin: 0;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    flex-shrink: 0;
    background-color: #9ca3af4d;
    height: 1rem;
    width: 1rem;
    user-select: none;
    border-radius: .375rem
}

.checkbox input:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")
}

.checkbox span {
    margin-left: .375rem;
    font-size: 13px;
    opacity: .7
}`}
      </style>
    </>
  )
}

export default Demo
