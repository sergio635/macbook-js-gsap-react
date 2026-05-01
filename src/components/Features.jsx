import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import StudioLights from './three/StudioLights'
import clsx from 'clsx'
import { features, featureSequence } from '../constants'
import { Html } from '@react-three/drei'
import { MacbookModel } from './models/Macbook'
import { useMediaQuery } from 'react-responsive'
import useMacbookStore from '../store/store.index'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const ModelScroll = () => {
  const groupRef = useRef(null);
  const videoRef = useRef(null);
  const prevVideoIndex = useRef(-1);
  const boxCounterRef = useRef(0)
  const [boxCounter, setBoxCounter] = useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const { texture, setTexture } = useMacbookStore()
  
  useGSAP(() => {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
      }
    })

    // Animación de rotación del modelo (más larga para distribuir cambios)
    if(groupRef.current){
      mainTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 10,
        ease: 'power1.inOut'
      }, 0)
    }

    // Box 1 - Posición 0 (0% del scroll)
    mainTimeline.call(() => {
      console.log('Mostrando Box 1')
      boxCounterRef.current = 0
      setBoxCounter(1)
      gsap.set(['.box1', '.box2', '.box3', '.box4', '.box5'], { opacity: 0, y: 20 })
      gsap.set('.box1', { opacity: 1, y: 0 })
      
      setTexture(featureSequence[0].videoPath)
      if (videoRef.current) {
        videoRef.current.src = featureSequence[0].videoPath
        videoRef.current.load()
        videoRef.current.play().catch(e => console.log('Error:', e))
      }
    }, null, 0)

    // Box 2 - Posición 2.5 (25% del scroll)
    mainTimeline.call(() => {
      console.log('Mostrando Box 2')
      boxCounterRef.current = 1
      setBoxCounter(2)
      gsap.set(['.box1', '.box2', '.box3', '.box4', '.box5'], { opacity: 0, y: 20 })
      gsap.set('.box2', { opacity: 1, y: 0 })
      
      setTexture(featureSequence[1].videoPath)
      if (videoRef.current) {
        videoRef.current.src = featureSequence[1].videoPath
        videoRef.current.load()
        videoRef.current.play().catch(e => console.log('Error:', e))
      }
    }, null, 2.5)

    // Box 3 - Posición 5 (50% del scroll)
    mainTimeline.call(() => {
      console.log('Mostrando Box 3')
      boxCounterRef.current = 2
      setBoxCounter(3)
      gsap.set(['.box1', '.box2', '.box3', '.box4', '.box5'], { opacity: 0, y: 20 })
      gsap.set('.box3', { opacity: 1, y: 0 })
      
      setTexture(featureSequence[2].videoPath)
      if (videoRef.current) {
        videoRef.current.src = featureSequence[2].videoPath
        videoRef.current.load()
        videoRef.current.play().catch(e => console.log('Error:', e))
      }
    }, null, 5)

    // Box 4 - Posición 7.5 (75% del scroll)
    mainTimeline.call(() => {
      console.log('Mostrando Box 4')
      boxCounterRef.current = 3
      setBoxCounter(4)
      gsap.set(['.box1', '.box2', '.box3', '.box4', '.box5'], { opacity: 0, y: 20 })
      gsap.set('.box4', { opacity: 1, y: 0 })
      
      setTexture(featureSequence[3].videoPath)
      if (videoRef.current) {
        videoRef.current.src = featureSequence[3].videoPath
        videoRef.current.load()
        videoRef.current.play().catch(e => console.log('Error:', e))
      }
    }, null, 7.5)

    // Box 5 - Posición 10 (100% del scroll)
    mainTimeline.call(() => {
      console.log('Mostrando Box 5')
      boxCounterRef.current = 4
      setBoxCounter(5)
      gsap.set(['.box1', '.box2', '.box3', '.box4', '.box5'], { opacity: 0, y: 20 })
      gsap.set('.box5', { opacity: 1, y: 0 })
      
      setTexture(featureSequence[4].videoPath)
      if (videoRef.current) {
        videoRef.current.src = featureSequence[4].videoPath
        videoRef.current.load()
        videoRef.current.play().catch(e => console.log('Error:', e))
      }
    }, null, 10)

    return () => {
      mainTimeline.kill()
    }
  }, [])



  return(
    <group ref={groupRef}>
      <Suspense fallback={<Html>
        <h1 className='text-white text-3xl uppercase'>Loading...</h1>
      </Html>}>
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} ></MacbookModel>
        <Html position={[0, 0.2, 0.5]} scale={isMobile ? 0.4 : 0.6}>
          <video
            ref={videoRef}
            src={texture}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '400px',
              height: '280px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          />
        </Html>
        <Html position={[-2, 1.5, 0]} scale={0.5}>
          <div className='bg-black/80 px-4 py-2 rounded-lg'>
            <p className='text-white text-xl font-bold'>Box: {boxCounter}</p>
          </div>
        </Html>
      </Suspense>
    </group>
  )
}

  



const Features = () => {
  return (
    <section id='features' className='relative w-full'>
      <h2>See it all in a new light.</h2>
      <div className='relative w-full h-screen'>
        <Canvas id='f-canvas' camera={{}}>
          <ambientLight intensity={0.5} />
          <StudioLights />
          <ModelScroll/>
        </Canvas>

        <div className='absolute inset-0 pointer-events-none'>
          {features.map((feature, index) => ( 
            <div key={index} className={
              clsx(
                'box',
                `box${index + 1}`,
                feature.styles
          )} >
              <div className='flex flex-col gap-2'>
                <h3 className='text-white font-semibold text-lg'>{feature.highlight}</h3>
                <p className='text-white/70 text-sm max-w-xs'>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features