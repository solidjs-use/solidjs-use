import { Center, Spinner } from '@hope-ui/solid'
import { Route, Routes } from '@solidjs/router'
import { Suspense, lazy } from 'solid-js'

import markdownComponents from './components/markdownComponents'
import AppLayout from './components/AppLayout'

import LandingPage from './pages/landing-page'
import NotFound from './pages/not-found'

const ComponentsPage = lazy(() => import('./pages/components-page'))
const BestPractice = lazy(() => import('./pages/best-practice.md'))
const Config = lazy(() => import('./pages/config.md'))
const Contributing = lazy(() => import('./pages/contributing.md'))
const ExportSize = lazy(() => import('./pages/export-size.md'))
const GettingStarted = lazy(() => import('./pages/getting-started.md'))
const Guidelines = lazy(() => import('./pages/guidelines.md'))
const Functions = lazy(() => import('./pages/functions.md'))
const AddOns = lazy(() => import('./pages/add-ons.md'))
const FunctionsList = lazy(() => import('./components/FunctionsList'))

export default function App() {
  return (
    <Suspense
      fallback={
        <Center mt="$4">
          <Spinner size="lg" thickness="3px" color="$primary9" />
        </Center>
      }
    >
      <Routes base="/solidjs-use">
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AppLayout />}>
          <Route path="/getting-started" element={<GettingStarted components={markdownComponents} />} />
          <Route path="/best-practice" element={<BestPractice components={markdownComponents} />} />
          <Route path="/config" element={<Config components={markdownComponents} />} />
          <Route path="/contributing" element={<Contributing components={markdownComponents} />} />
          <Route path="/guidelines" element={<Guidelines components={markdownComponents} />} />
          <Route path="/add-ons" element={<AddOns components={markdownComponents} />} />
          <Route path="/functions" element={<Functions components={{ ...markdownComponents, FunctionsList }} />} />
          <Route path="/export-size" element={<ExportSize components={markdownComponents} />} />
          <ComponentsPage />
        </Route>
        <Route path="/*all" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
