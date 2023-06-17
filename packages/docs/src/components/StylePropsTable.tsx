import { hope, Table, Tbody, Td, Th, Thead, Tr } from '@hope-ui/solid'
import { For, splitProps } from 'solid-js'
import type { TableProps } from '@hope-ui/solid'

export interface StylePropsTableItem {
  prop: string
  cssProperty: string
  themeToken?: string
}

type StylePropsTableProps = TableProps & { items: StylePropsTableItem[] }

export function StylePropsTable (props: StylePropsTableProps) {
  const [local, others] = splitProps(props, ['items'])

  return (
    <hope.div overflowX="auto" {...others}>
      <Table dense>
        <Thead bg="$neutral2">
          <Tr>
            <Th>Prop</Th>
            <Th>CSS property</Th>
            <Th css={{ whiteSpace: 'nowrap' }}>Theme token</Th>
          </Tr>
        </Thead>
        <Tbody color="$primary11" fontFamily="$mono">
          <For each={local.items}>
            {item => (
              <Tr>
                <Td>{item.prop}</Td>
                <Td>{item.cssProperty}</Td>
                <Td color={item.themeToken ? 'inherit' : '$neutral12'}>{item.themeToken ?? 'none'}</Td>
              </Tr>
            )}
          </For>
        </Tbody>
      </Table>
    </hope.div>
  )
}
