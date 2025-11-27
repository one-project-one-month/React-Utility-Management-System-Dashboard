import { useTheme } from "@heroui/use-theme";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
   const { theme, setTheme } = useTheme();

   useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
         setTheme(storedTheme);
      } else {
         setTheme("light");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (theme) {
         localStorage.setItem("theme", theme);
      }
   }, [theme]);

   return (
      <Button
         variant="light"
         size="sm"
         onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
         className="transition-colors duration-300 bg-transparent 
                 dark:hover:bg-neutral-600"
      >
         {theme === "dark" ? (
            <Sun
               className="text-yellow-400 transition-transform duration-300"
               size={20}
            />
         ) : (
            <Moon
               className="text-blue-500 transition-transform duration-300"
               size={20}
            />
         )}
      </Button>
   );
}
