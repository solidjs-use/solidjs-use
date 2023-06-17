import { Box, Grid, GridItem, hope, HStack, useTheme, VStack } from '@hope-ui/solid'
import { For, splitProps } from 'solid-js'
import type { GridProps, SystemConfig } from '@hope-ui/solid'

export interface ColorScaleItem {
  name: string
  token: keyof SystemConfig['theme']['colors']
}

type ColorScaleProps = GridProps & {
  scale: ColorScaleItem[]
}

export function ColorScale (props: ColorScaleProps) {
  const theme = useTheme()
  const [local, others] = splitProps(props, ['scale'])

  return (
    <Grid
      templateColumns={{
        '@initial': 'repeat(2, minmax(0, 1fr))',
        '@md': 'repeat(3, minmax(0, 1fr))'
      }}
      gap="$6"
      {...others}
    >
      <For each={local.scale}>
        {item => (
          <GridItem>
            <HStack spacing="$3">
              <Box
                boxSize={{ '@initial': '$10', '@sm': '$12' }}
                rounded="$md"
                shadow="$inner"
                bg={theme().colors[item.token].value}
              />
              <VStack alignItems="flex-start">
                <hope.span fontSize="$sm" fontWeight="$semibold">
                  {item.name}
                </hope.span>
                <hope.span fontSize="$sm" textTransform="uppercase">
                  {theme().colors[item.token].value}
                </hope.span>
              </VStack>
            </HStack>
          </GridItem>
        )}
      </For>
    </Grid>
  )
}
