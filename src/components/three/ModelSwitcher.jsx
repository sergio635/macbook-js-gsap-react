// 14 and 16 -> PresentationControls
import { PresentationControls } from '@react-three/drei'
import MacbookModel14 from '../models/Macbook-14'
import MacbookModel16 from '../models/Macbook-16'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;
const fadeMeshes = (group, opacity, animate = true) =>  {
    if (!group) return;
    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            if (animate) {
                gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
            } else {
                gsap.set(child.material, {opacity})
            }

        }
    })
}

const moveGroup = (group, x, animate = true) => {
    if(!group) return;
    if (animate) {
        gsap.to(group.position, {x, duration: ANIMATION_DURATION})
    } else {
        gsap.set(group.position, {x})
    }
}

const ModelSwitcher = ({scale, isMobile}) => {
const smallMacbookRef = useRef(null);
const largeMacbookRef = useRef(null);
const isFirstRender = useRef(true);
const showLargeMacbook = scale === 0.08 || scale === 0.05;

useGSAP(() => {
    const animate = !isFirstRender.current

    if(showLargeMacbook){
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE, animate)
        moveGroup(largeMacbookRef.current, 0, animate)
        fadeMeshes(smallMacbookRef.current, 0, animate)
        fadeMeshes(largeMacbookRef.current, 1, animate)
    } else {
        moveGroup(smallMacbookRef.current, 0, animate)
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE, animate)
        fadeMeshes(smallMacbookRef.current, 1, animate)
        fadeMeshes(largeMacbookRef.current, 0, animate)
    }

    if (isFirstRender.current) {
        isFirstRender.current = false
    }
}, [scale])


/** @type {[number, number]} */
const polarRange = [-Math.PI, Math.PI]
/** @type {[number, number]} */
const azimuthRange = [-Infinity, Infinity]
const controlsConfig = {
    snap: true, 
    speed: 0.8, 
    zoom: 0.8,
    global: false,
    polar: polarRange,
    azimuth: azimuthRange,
    config: {mass:1, tension:0, friction:26}
}
  return ( <>
      <PresentationControls {...controlsConfig}> 
      <group ref={largeMacbookRef}>
        
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        
      </group>
    </PresentationControls>
    
    <PresentationControls {...controlsConfig}> 
      <group ref={smallMacbookRef}>
        
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
      </group>
    </PresentationControls>

  </>

  )
}

export default ModelSwitcher