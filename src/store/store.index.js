import { create } from 'zustand'

const useMacbookStore = create((set) => ({
    color: '#adb5db',
    setColor: (color) => set({ color }),
    scale: 0.06,
    setScale: (scale) => set({ scale }),
    reset: () => set({ color: '#adb5db', scale: 0.06 }),
}))

export default useMacbookStore