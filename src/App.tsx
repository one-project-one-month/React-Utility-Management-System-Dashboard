import { BrowserRouter, Route, Routes } from "react-router"
import { useRoutes } from "./hooks/useRoutes"
import { Suspense } from "react"

function App() {
  const routes = useRoutes()

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route
                key={index}
                path={path}
                element={element}
              />
            ))}
          </Routes>
          {/* <Route path="*" element={<NotFound />} /> */}

        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
