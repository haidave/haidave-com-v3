import { useCallback } from 'react'

interface UseThemeTransitionProps {
  onTransition: () => void
}

export const useThemeTransition = ({ onTransition }: UseThemeTransitionProps) => {
  const triggerTransition = useCallback(() => {
    if (!document.startViewTransition) {
      onTransition()
      return
    }

    document.documentElement.classList.add('theme-transition')

    document
      .startViewTransition(() => {
        onTransition()
      })
      .finished.then(() => {
        document.documentElement.classList.remove('theme-transition')
      })
  }, [onTransition])

  return { triggerTransition }
}
