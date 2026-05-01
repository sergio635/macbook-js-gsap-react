import useMacbookStore from '../store/store.index'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive'
import StudioLights from './three/StudioLights'
import ModelSwitcher from './three/ModelSwitcher'

const ProductViewer = () => {
  const { color, setColor, scale, setScale } = useMacbookStore()
  const isMobile = useMediaQuery({query: '(max-width: 1024px) '})

  return (
    <section id='product-viewer'>
      <h2>Take a closer look</h2>
      <div className='controls'>
        <p className='info'>
          MacBook {scale} in {color}
        </p>
        <div className='color-control'>
          <button
            type="button"
            onClick={() => setColor('#adb5db')}
            aria-pressed={color === '#adb5db'}
            className={`size-7 rounded-full cursor-pointer bg-neutral-300 transition-all duration-300 ${color === '#adb5db' ? 'active ring-5 ring-light-100' : ''}`}
          />
          <button
            type="button"
            onClick={() => setColor('#123123')}
            aria-pressed={color === '#123123'}
            style={{ backgroundColor: '#123123' }}
            className={`size-7 rounded-full cursor-pointer transition-all duration-300 ${color === '#123123' ? 'active ring-5 ring-light-100' : ''}`}
          />
        </div>

        <div role='radiogroup' aria-label='MacBook size' className='size-control'>
          <button
            type='button'
            role='radio'
            aria-checked={scale === 0.06}
            onClick={() => setScale(0.06)}
            className={`size-8 rounded-full cursor-pointer flex-center text-xs font-semibold transition-all duration-300 ${
              scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white border border-white/30'
            }`}
          >
            14"
          </button>
          <button
            type='button'
            role='radio'
            aria-checked={scale === 0.08}
            onClick={() => setScale(0.08)}
            className={`size-8 rounded-full cursor-pointer flex-center text-xs font-semibold transition-all duration-300 ${
              scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white border border-white/30'
            }`}
          >
            16"
          </button>
        </div>
      </div>

      <Canvas
        id='canvas'
        dpr={[1, 1.5]}
        camera={{ position: [0,2,5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />
        <ModelSwitcher scale={isMobile ? scale - 0.03 : scale } isMobile={isMobile} />
      </Canvas>
    </section>
  )
}

export default ProductViewer