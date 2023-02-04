import { Box, Container, Flex, hope, Progress, ProgressIndicator } from '@hope-ui/solid'
import { Outlet, useIsRouting } from 'solid-app-router'
import { Portal } from 'solid-js/web'
import 'solid-mdx'

import PageLayout from './PageLayout'
import Header from './Header'
import MainNavigation from './MainNavigation'

function AppLayout() {
  const isRouting = useIsRouting()

  return (
    <Flex direction="column">
      <Portal>
        <Box position="fixed" top="0" left="0" right="0" zIndex="$banner">
          <Progress indeterminate size="xs" d={isRouting() ? 'block' : 'none'}>
            <ProgressIndicator />
          </Progress>
        </Box>
      </Portal>
      <Header />
      <Container flexGrow={1}>
        <Flex>
          <MainNavigation />
          <hope.main w="$full">
            <PageLayout>
              <Outlet />
            </PageLayout>
          </hope.main>
        </Flex>
      </Container>
    </Flex>
  )
}

export default AppLayout
