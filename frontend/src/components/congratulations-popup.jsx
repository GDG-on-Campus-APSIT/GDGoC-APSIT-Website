"use client"

import { WarpBackground } from "@/components/ui/warp-background"
import { Card, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/wrap-card"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function CongratulationsPopUp() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <WarpBackground className="w-full h-full flex items-center justify-center">
            <Card className="w-full max-w-4xl mx-4 md:mx-auto">
              <CardContent className="flex flex-col gap-6 p-8">
                <CardTitle className="text-4xl font-bold text-center">Congratulations on Your Certificate!</CardTitle>
                <CardDescription className="text-xl text-center">
                  Your hard work and dedication have paid off. We're thrilled to see you take this next step in your
                  career. Keep up the fantastic work!
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center items-center p-4 text-base text-black">
                This certificate is valid for a lifetime.
              </CardFooter>
            </Card>
          </WarpBackground>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

