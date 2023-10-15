"use client" 
import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import dynamic from 'next/dynamic'
import { useAppDispatch } from 'store'
import { update } from 'store/reducer/fps.slice'

const Ground = dynamic(() => import('components/assets/ground'), { ssr: false });
const Player = dynamic(() => import('components/assets/player'), { ssr: false });
const Menu = dynamic(() => import('./menu'), { ssr: true });
const FPS = dynamic(() => import('components/three/fpsCounter'), { ssr: false });

type Props = {}
export default function fahrzeuge({}: Props) {

  return (
    <div className='h-full w-screen'>
      <Suspense fallback={null}>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={0.5} />
          <FPV />
          <Physics>
            <Player />
            <Ground />
          </Physics>
          <Renderer />
        </Canvas>
        <FPS />
        <Menu />
      </Suspense>
    </div>
  )
}

export const FPV = () => {
	const { camera, gl } = useThree()

	return (<PointerLockControls args={[camera, gl.domElement]} />)
}

export const Renderer = () => {

  const dispatch = useAppDispatch();
  useFrame((state, delta, frame) => {
    dispatch(update(delta));

    //TODO add render altering logic
  });

  return null;
}