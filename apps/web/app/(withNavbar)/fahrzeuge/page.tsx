"use client"
import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, Sky, Stats as _Stats } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import dynamic from 'next/dynamic'

import { MenuProvider, useMenu } from './menuContext'
import Menu from './menu'

const Ground = dynamic(() => import('components/assets/ground'), { ssr: false });
const Player = dynamic(() => import('./player'), { ssr: false });

type Props = {}
export default function fahrzeuge({ }: Props) {
  return (
    <div className='w-screen h-[85svh]'>
      <Suspense fallback={null}>
        <MenuProvider>
          <Stats/>
          <Canvas>
            <Sky sunPosition={[100, 100, 20]} />
            <ambientLight intensity={0.6} />
            <FPV />
            <Physics>
              <Player />
              <Ground />
            </Physics>
            <Renderer />
          </Canvas>
          <Menu/>
        </MenuProvider>
      </Suspense>
    </div>
  )
}

const FPV = () => {
  const { camera, gl } = useThree()
  const { setShowMenu, showMenu } = useMenu();

  return (
    <PointerLockControls 
      camera={camera} 
      domElement={gl.domElement} 
      enabled={!showMenu}
      onLock={() => setShowMenu(false)}
      onUnlock={() => setShowMenu(true)}
    />
  )
}

const Renderer = () => {
  useFrame((state, delta, frame) => {

    //TODO add render altering logic
  });
  return null;
}

const Stats = () => {
  const { showStats } = useMenu();
  return showStats ? <_Stats /> : null;
}
