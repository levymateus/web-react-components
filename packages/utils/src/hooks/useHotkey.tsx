import { useEffect } from 'react'

interface Hotkey {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

interface Args {
  ref: Document;
  eventType?: string | null;
  hotkey: Hotkey;
}

function useHotkey(
  callback: ((evt: Event) => void),
  { ref, eventType, hotkey }: Args
) {
  useEffect(() => {
    const handleEvent = (evt: Event) => {
      const { key, ctrlKey, altKey, shiftKey } = evt as KeyboardEvent
      if (key === hotkey.key) {
        if (
          hotkey.ctrlKey !== undefined ||
          hotkey.altKey !== undefined ||
          hotkey.shiftKey !== undefined
        ) {
          if (
            hotkey.ctrlKey === ctrlKey ||
            hotkey.altKey === altKey ||
            hotkey.shiftKey === shiftKey
          ) {
            callback(evt)
          }
        } else {
          callback(evt)
        }
      }
    }

    if (ref) {
      ref.addEventListener(eventType || 'keydown', handleEvent, false)
    }

    return () => {
      ref.removeEventListener(eventType || 'keydown', handleEvent)
    }
  }, [ref, hotkey, callback])
}

export { useHotkey }