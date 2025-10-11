import { Route, Routes, useNavigate, useHref } from "react-router"
import { HeroUIProvider } from '@heroui/react'
import { useRoutes } from "@/hooks/useRoutes"
import { Suspense } from "react"
import PageLayout from "@/layout/PageLayout"
import NotFound from "@/page/NotFound"
import LoginPage from "./page/Auth";
function App() {
  const routes = useRoutes()
  const navigate = useNavigate()

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <main className="font-roboto text-foreground bg-background">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PageLayout />}>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </HeroUIProvider>
  )
}

export default App;
