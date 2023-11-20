import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import React from "react"
import { Mesh, Vector3 } from "three"

import { useKeyboard } from "./useKeyboard"

export default () => {

  const [speed, setSpeed] = React.useState(5);
  const [jumpForce, setJumpForce] = React.useState(5);

  const velocity = React.useRef([0, 0, 0]);
  const position = React.useRef([0, 0, 0]);

  const actions = useKeyboard();
  const { camera } = useThree();
  const [ref, api] = useSphere<Mesh>(() => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 1, 0],
	}))

  React.useEffect(() => {
    return api.velocity.subscribe((v) => {
      velocity.current = v;
    });
  }, [api.velocity]);

  React.useEffect(() => {
    return api.position.subscribe((p) => {
      position.current = p;
    });
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0) 
    );

    const sideVector = new Vector3(
      (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
      0,
      0
    );

    direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(speed)
			.applyEuler(camera.rotation)

      api.velocity.set(direction.x, velocity.current[1], direction.z);

      if (actions.jump && Math.abs(velocity.current[1]) < 0.1) {
        api.velocity.set(velocity.current[0], jumpForce, velocity.current[2])
      }
    });

  return (
    <mesh ref={ref}></mesh>
  )
}
