"use client";

import { WarpBackground } from "@/components/ui/warp-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/wrap-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


export function CongratulationsPopUp() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30"
        >
          <WarpBackground>
            <Card className="w-80">
              <CardContent className="flex flex-col gap-2 p-4">
                <CardTitle>Congratulations on Your Certificate!</CardTitle>
                <CardDescription>
                  Your hard work and dedication have paid off. We&apos;re
                  thrilled to see you take this next step in your career. Keep
                  up the fantastic work!
                </CardDescription>
              </CardContent>
              <CardFooter className="text-base text-black pl-4 pb-1">
                This certificate is valid for a lifetime.
              </CardFooter>
            </Card>
          </WarpBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
