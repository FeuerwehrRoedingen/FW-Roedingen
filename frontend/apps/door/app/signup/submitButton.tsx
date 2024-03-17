'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/button'

export default function(){

  const { pending } = useFormStatus();

  return (
    <Button 
      type='submit'
      isLoading={pending}
      color="primary"
      size='lg'
    >
      Submit
    </Button>
  )
}