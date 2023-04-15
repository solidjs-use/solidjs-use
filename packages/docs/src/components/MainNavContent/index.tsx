import { VStack } from '@hope-ui/solid'
import { For } from 'solid-js'

import AppNavLink from '../AppNavLink'
import MainNavTitle from '../MainNavTitle'

import { categoryNames, categoryFunctions } from '../../../../../meta'

export default function MainNavContent() {
  return (
    <>
      <MainNavTitle mb="$2">Getting started</MainNavTitle>
      <VStack alignItems="flex-start" spacing="$1" mb="$6">
        <AppNavLink end href="/solidjs-use/getting-started">
          Get Started
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/best-practice">
          Best Practice
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/config">
          Configurations
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/contributing">
          Contributing
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/guidelines">
          Guidelines
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/export-size">
          Export size
        </AppNavLink>
        <AppNavLink end href="/solidjs-use/functions">
          Functions
        </AppNavLink>
      </VStack>
      <For each={categoryNames}>
        {(category: string) => {
          return (
            <>
              {' '}
              <MainNavTitle mb="$2">{category}</MainNavTitle>
              <VStack alignItems="flex-start" spacing="$1" mb="$6">
                <For each={categoryFunctions[category]}>
                  {functionInfo => (
                    <AppNavLink href={`/solidjs-use/${functionInfo.package}/${functionInfo.name}`} end>
                      {functionInfo.name}
                    </AppNavLink>
                  )}
                </For>
              </VStack>
            </>
          )
        }}
      </For>
    </>
  )
}
