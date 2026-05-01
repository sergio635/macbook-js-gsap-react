import React, { useEffect, useRef } from 'react'

const Hero = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);
  return (
    <section id='hero'>
        <div>
            <h1>MacBook Pro</h1>
            <img src="/title.png" alt="MacBook title" />
        </div>
        <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />
        <p className='mt-10 lg:mt-0 base-semibold'>From $199/mo. or $999</p>
        <button>Buy</button>
    </section>
  )
}

export default Hero