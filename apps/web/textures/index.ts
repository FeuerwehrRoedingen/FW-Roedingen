"use client"
import { NearestFilter, TextureLoader, RepeatWrapping } from 'three'

//------------------------------------------------------------------------
// Ground
//------------------------------------------------------------------------
const groundTexture = new TextureLoader().load('/textures/ground.png');
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.repeat.set(100, 100);



export { 
  groundTexture 
}
