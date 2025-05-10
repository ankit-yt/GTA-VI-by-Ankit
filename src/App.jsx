import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

function App() {
  const [showContent, setShowContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.easeInOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector('.svg')?.remove()
          setShowContent(true)
          this.kill()
        }
      },
    })
  }, [])

  useGSAP(() => {
    if (!showContent) return

    gsap.to('.main', {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: 'Expo.easeInOut',
    })
    gsap.to('.sky', {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: 'Expo.easeInOut',
    })
    gsap.to('.bg', {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: 'Expo.easeInOut',
    })
    let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.to(".character", {
    scale: 0.8,
    x: "-50%",
    bottom: "-60%",  
    rotate: 0,
    duration: 2,
    delay: -0.8,
    ease: "Expo.easeInOut",
  });
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".character", {
    scale: 1.3,
    x: "-50%",
    bottom: "-20%", 
    rotate: 0,
    duration: 2,
    delay: -0.8,
    ease: "Expo.easeInOut",
  });
});
    gsap.to('.text', {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: 'Expo.easeInOut',
    })

    const main = document.querySelector('.main')
    main?.addEventListener('mousemove', (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40
      gsap.to('.imgesdiv .text', {
        x: `${xMove * 0.4}%`,
      })
      gsap.to('.sky', {
        x: xMove,
      })
      gsap.to('.bg', {
        x: xMove * 1.7,
      })
    })
  }, [showContent])

  return (
    <div className='w-full overflow-hidden'>
      
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]'>
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text
                  x='50%'
                  y='50%'
                  fontSize='250'
                  textAnchor='middle'
                  fill='white'
                  dominantBaseline='middle'
                  fontFamily='Arial Black'
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href='./bg.png'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#viMask)'
          />
        </svg>
      </div>

      {showContent && (
        <div className='main w-full overflow-hidden scale-[1.5] rotate-[-10deg]'>
          
          <div className='landing overflow-hidden w-full h-screen bg-black'>
            
            <div className='navbar w-full py-7 px-4 sm:px-8 absolute top-0 left-0 z-10'>
              <div className='logo flex gap-5 items-center'>
                <div className='lines flex flex-col gap-[5px]'>
                  <div className='line w-8 sm:w-10 h-1 bg-white'></div>
                  <div className='line w-5 sm:w-6 h-1 bg-white'></div>
                  <div className='line w-3 sm:w-4 h-1 bg-white'></div>
                </div>
                <h3 className='text-xl sm:text-2xl text-white'>Rockstar</h3>
              </div>
            </div>

           
            <div className='imgesdiv w-full h-screen overflow-hidden relative'>
              <img
                className='w-full h-full object-cover scale-[1.5] rotate-[-20deg] absolute top-0 left-0 sky'
                src='sky.png'
                alt=''
              />
              <img
                className='w-full h-full object-cover scale-[1.8] rotate-[-3deg] absolute top-0 left-0 bg'
                src='./bg.png'
                alt=''
              />
              <div className='text absolute flex flex-col gap-1 scale-[1.2] sm:scale-[1.4] rotate-[-10deg] text-white top-16 sm:top-20 left-1/2 -translate-x-1/2'>
                <h1 className='text-5xl sm:text-8xl -ml-20 sm:-ml-40'>Grand</h1>
                <h1 className='text-5xl sm:text-8xl -ml-10 sm:-ml-20'>theft</h1>
                <h1 className='text-5xl sm:text-8xl -ml-20 sm:-ml-40'>auto</h1>
              </div>
              <img
                className='absolute character bottom-[-250%] left-1/2 -translate-x-1/2 scale-[1.5] sm:scale-[2] rotate-[-10deg]'
                src='./girlbg.png'
                alt=''
              />
            </div>

            <div className='btmbar text-white w-full py-10 px-4 sm:px-8 absolute bottom-[50%] left-0 z-10 bg-gradient-to-t from-black to-transparent'>
              <div className='flex items-center gap-2'>
                <i className='text-lg ri-arrow-down-line font-extralight'></i>
                <h3 className='text-sm font-light font-[helvetica]'>
                  Scroll Down
                </h3>
              </div>
              <img
                className='h-[35px] sm:h-[45px] absolute mt-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                src='./ps5.png'
                alt=''
              />
            </div>
          </div>

       
          <div className='w-full overflow-hidden h-auto min-h-screen flex flex-col lg:flex-row px-4 sm:px-10 py-10 items-center justify-center'>
            <div className='cntnr w-full flex flex-col lg:flex-row items-center justify-between h-full'>
            
              <div className='limg w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-full'>
                <img
                  className='absolute scale-[.8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  src='./imag.png'
                  alt=''
                />
              </div>

             
              <div className='right text-white mt-10 lg:mt-0 w-full lg:w-[40%]'>
                <h1 className='text-4xl sm:text-6xl lg:text-7xl leading-tight'>
                  Still Running,
                </h1>
                <h1 className='text-4xl sm:text-6xl lg:text-7xl leading-tight'>
                  Not Hunting
                </h1>
                <p className='text-sm sm:text-md font-[helvetica] mt-6 sm:mt-10'>
                  Grand Theft Auto VI takes you deep into the heart of Leonida, a
                  vibrant open world inspired by Miami and beyond. With next-gen
                  realism, dynamic weather, and an evolving storyline, it's more
                  than just a game — it's an experience.
                </p>
                <p className='text-sm sm:text-md font-[helvetica] mt-2'>
                  Play as Lucia and her partner as they navigate crime, loyalty,
                  and survival in a world where every choice matters. Get ready
                  to rewrite the rules of the streets.
                </p>
                <button className='bg-yellow-500 px-4 sm:px-5 py-3 sm:py-5 text-lg sm:text-2xl text-black mt-5'>
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
