import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { useRef } from 'react'
import {useMediaQuery} from 'react-responsive'

const Showcase = () => {
    const sectionRef = useRef(null);
    const isTablet = useMediaQuery({
        query: '(max-width: 1440px)'
    });

    useGSAP(() => {
        const initialScale = isTablet ? 7.2 : 7.8;
        const finalScale = 1;
        const scrollDistance = isTablet ? '+=420%' : '+=360%';
        gsap.set('.mask img', {
            scale: initialScale,
            transformOrigin: 'center center',
            force3D: true
        });

        const timeline = gsap.timeline({
            scrollTrigger:{
                trigger: '#showcase',
                start: 'top top',
                end: '+=120%',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        timeline
        .to('.mask img', {
            scale: finalScale,
            ease: 'none',
            force3D: true
        }, 0)
        .to('.content', {
            opacity:1, 
            y:0, 
            ease: 'power1.in'
        }, 0.35)
    }, [isTablet])

  return (
    <section id="showcase" ref={sectionRef}>
        <div className='media'>
            <video src="/videos/game.mp4" loop autoPlay  playsInline muted />
            <div className='mask'>
                <img src="/mask-logo.svg" />
            </div>
        </div>
            <div className='content'>
                <div className='wrapper'>
                    <div className='lg:max-w-md'>
                        <h2>Rocket Chip</h2>
                        <div className='space-y-5 mt-7 pe-10'>
                            <p>
                                Introducing {' '}
                                <span className='text-white'>
                                    M4, the next generation of Apple silicon
                                </span>
                                M4 powers
                            </p>
                            <p>
                                It drives Apple intelligence on iPad Pro, so you can write, create, and accomplish more with ease. All in a design that's unbeliavably thin, light and powerful.
                            </p>
                            <p>
                                A brand-new-display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray spacing brings console-level graphics to your fingertips.
                            </p>
                            <p className='text-primary'> Learn more about Apple intelligence.</p>
                        </div>
                    </div>
                    <div className='max-w-3xs space-y-14'>
                        <div className='space-y-2'>
                            <p>Up to</p>
                            <h2>1.4x faster</h2>
                            <p>pro rendering performance than M2.</p>
                        </div>
                        <div className='space-y-2'>
                            <p>Up to</p>
                            <h2>1.5x faster</h2>
                            <p>CPU performance than M2.</p>
                        </div>
                    </div>
                </div>
            </div>
        
    </section>
  )
}

export default Showcase