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
          <div
            onClick={() => setColor('#adb5db')}
            className={`bg-neutral-300 ${color === '#adb5db' ? 'active' : ''}`}
          />
          <div
            onClick={() => setColor('#123123')}
            style={{ backgroundColor: '#123123' }}
            className={`${color === '#123123' ? 'active' : ''}`}
          />
        </div>

        <div className='size-control'>
          <div
            onClick={() => setScale(0.06)}
            className={
              scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white'
            }
          >
            <p>14"</p>
          </div>
          <div
            onClick={() => setScale(0.08)}
            className={
              scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white'
            }
          >
            <p>16"</p>
          </div>
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