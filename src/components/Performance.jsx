import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { performanceImages, performanceImgPositions } from '../constants'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // Text animation - fade in and move up on scroll
      gsap.fromTo('.content p', 
      {
        opacity: 0,
        y: 10
      }, 
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.content p',
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      })



      // Image animations on desktop only
      if (window.innerWidth >= 1024) {
        // Create scrubbed scroll timeline tied to section
        const tl = gsap.timeline({
          defaults: { ease: 'power1.inOut', duration: 2, overwrite: 'auto' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Initialize and animate each image (except p5) at time 0
        performanceImgPositions.forEach((position) => {
          

          if (position.id !== 'p5') {
            const selector = `.${position.id}`

            // Initial state
            gsap.set(selector, {
              opacity: 0,
              transform: 'translateY(50px)',
            })

            // Build final animation object with positions from constants
            const finalProps = {
              opacity: 1,
              transform: 'translateY(0)',
            }

            if (position.left !== undefined) {
              finalProps.left = `${position.left}%`
            }
            if (position.right !== undefined) {
              finalProps.right = `${position.right}%`
            }
            if (position.bottom !== undefined) {
              finalProps.bottom = `${position.bottom}%`
            }

            // Add animation at time 0 (all images animate together)
            tl.to(selector, finalProps, 0)
          } else {
            return
          }
        })
      }

      // Handle resize to refresh ScrollTriggers
      const handleResize = () => {
        ScrollTrigger.refresh()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    { scope: sectionRef }
  )

  return (
    <section id="performance" ref={sectionRef}>
        <h2>
            Next-level graphics performance. Game on.
        </h2>
        <div className="wrapper">
           {performanceImages.map((image) => (
            <img key={image.id} alt={image.id} src={image.src} className={image.id} />
           ))} 

        </div>
        <div className='content'>
          <p style={{ opacity: 0 }}>Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that render images faster, so gaming feels more immersive and realistic than ever before.</p>
        </div>
        
    </section>
  )
}

export default Performance