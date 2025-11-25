import { Button, Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router";
import { Droplet } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate("/"); // 👈 redirect to dashboard or home
   };

   return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100">
         {/* Animated Waves Background */}
         <div className="absolute bottom-0 left-0 w-full h-[200px] overflow-hidden">
            <motion.div
               className="absolute bottom-0 w-[200%] h-full bg-gradient-to-t from-blue-400/40 to-transparent"
               animate={{ x: ["0%", "-50%"] }}
               transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
               }}
            />
            <motion.div
               className="absolute bottom-0 w-[200%] h-full bg-gradient-to-t from-blue-300/40 to-transparent"
               animate={{ x: ["-50%", "0%"] }}
               transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
               }}
            />
         </div>

         {/* Card Content */}
         <Card className="relative z-10 max-w-md w-full text-center shadow-xl bg-white/90 dark:bg-blue-900/80 backdrop-blur-md border border-blue-200/30 dark:border-blue-700/40">
            <CardBody className="flex flex-col items-center gap-4 py-10 px-6">
               <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
               >
                  <Droplet className="w-16 h-16 text-blue-500 dark:text-blue-300 mb-3" />
               </motion.div>

               <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-200">
                  404
               </h1>
               <p className="text-lg text-blue-700/80 dark:text-blue-300/80">
                  💧 The page you’re looking for has run dry.
               </p>

               <Button
                  onPress={handleGoBack}
                  color="primary"
                  className="mt-6 font-semibold"
                  variant="solid"
               >
                  Return to Dashboard
               </Button>
            </CardBody>
         </Card>
      </div>
   );
}
