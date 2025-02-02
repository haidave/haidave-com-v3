'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { LINKS } from '@/config/links'
import { cn, copyToClipboard } from '@/lib/utils'

import { Button } from './button'

const EmailButton = () => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(LINKS.email)
    setIsCopied(true)
  }

  useEffect(() => {
    if (isCopied) {
      const timeoutId = window.setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => {
        window.clearTimeout(timeoutId)
      }
    }
  }, [isCopied])

  const variants = {
    hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.15 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  }

  return (
    <Button variant="ghost" size="link" onClick={handleCopy} className="group gap-1.5">
      E-mail
      <div className={cn('opacity-0 transition-opacity group-hover:opacity-100', isCopied && 'opacity-100')}>
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span key="checkmark" variants={variants} initial="hidden" animate="visible" exit="hidden">
              <CheckIcon size={12} />
            </motion.span>
          ) : (
            <motion.span key="copy" variants={variants} initial="hidden" animate="visible" exit="hidden">
              <CopyIcon size={12} className="opacity-100" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  )
}

export { EmailButton }
