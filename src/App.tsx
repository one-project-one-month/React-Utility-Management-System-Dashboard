import { BrowserRouter, Route, Routes } from "react-router"
import { useRoutes } from "@/hooks/useRoutes"
import { Suspense } from "react"
import PageLayout from "./layout/PageLayout"
import LoginPage from "./page/Auth"

function App() {
  const routes = useRoutes()

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PageLayout />}>
              {routes.map(({ path, element }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={element}
                />
              ))}
            </Route>
          </Routes>
          {/* <Route path="*" element={<NotFound />} /> */}

        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
