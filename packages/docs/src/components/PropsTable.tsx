import { Table, Tag, Tbody, Td, Th, Thead, Tr, VStack } from '@hope-ui/solid'
import { For, Show, splitProps } from 'solid-js'
import type { TableProps } from '@hope-ui/solid'

export interface PropsTableItem {
  name: string
  description: string
  type: string
  required?: boolean
  defaultValue?: string
}

type PropsTableProps = TableProps & { items: PropsTableItem[] }

export function PropsTable (props: PropsTableProps) {
  const [local, others] = splitProps(props, ['items'])

  return (
    <VStack spacing="$8" {...others}>
      <For each={local.items}>
        {item => (
          <Table dense>
            <Thead bg="$neutral2">
              <Tr>
                <Th fontSize="$base" letterSpacing="$normal" textTransform="none" colSpan={2}>
                  {item.name}
                  <Show when={item.required}>
                    <Tag ml="$1_5" colorScheme="danger" rounded="$sm">
                      required
                    </Tag>
                  </Show>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="$medium" maxW="100px" w="20%">
                  Description
                </Td>
                <Td>{item.description}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="$medium" maxW="100px" w="20%">
                  Type
                </Td>
                <Td fontFamily="$mono" fontSize="$sm" color="$primary11" css={{ wordBreak: 'break-word' }}>
                  {item.type}
                </Td>
              </Tr>
              <Show when={item.defaultValue}>
                <Tr>
                  <Td fontWeight="$medium" maxW="100px" w="20%">
                    Default
                  </Td>
                  <Td>{item.defaultValue}</Td>
                </Tr>
              </Show>
            </Tbody>
          </Table>
        )}
      </For>
    </VStack>
  )

  // return (
  //   <hope.div overflowX="auto" {...others}>
  //     <Table dense>
  //       <Thead bg="$neutral2">
  //         <Tr>
  //           <Th>Prop</Th>
  //           <Th>Description</Th>
  //           <Th>Type</Th>
  //           <Th>Default</Th>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         <For each={local.items}>
  //           {item => (
  //             <Tr>
  //               <Td
  //                 fontFamily="$mono"
  //                 fontWeight="$semibold"
  //                 color="$neutral12"
  //                 css={{ whiteSpace: "nowrap" }}
  //               >
  //                 {item.name}
  //                 <Show when={item.required}>
  //                   <Tag ml="$1" size="sm" colorScheme="danger" rounded="$sm" fontFamily="$sans">
  //                     required
  //                   </Tag>
  //                 </Show>
  //               </Td>
  //               <Td>{item.description}</Td>
  //               <Td fontFamily="$mono" fontSize="$sm" color="$primary11" maxW="350px">
  //                 {item.type}
  //               </Td>
  //               <Td fontFamily="$mono">{item.defaultValue}</Td>
  //             </Tr>
  //           )}
  //         </For>
  //       </Tbody>
  //     </Table>
  //   </hope.div>
  // );
}
