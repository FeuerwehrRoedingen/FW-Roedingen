import { Input } from '@nextui-org/input'
import { Spacer } from '@nextui-org/spacer'
import { Button } from '@nextui-org/button'

import SubmitButton from './submitButton'
import FileInput from './fileInput'
import RankSelector from 'components/rankSelector'
import PasswordInput from 'components/passswordInput'

export default function () {

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <form className='w-3/4 h-fit border border-silver rounded-2xl p-8' action={handleAction}>
        <div className='w-full h-5/6 flex flex-row items-center'>
          <div className='h-full w-1/2'>
            <RankSelector />
          </div>
          <div className='h-full w-1/2 flex flex-col items-center justify-center'>
            <div className='w-full h-fit flex flex-row justify-center items-center'>
              <div className='w-1/4 flex items-center justify-center'>
                <FileInput name='avatar' />
              </div>
              <Spacer x={4} />
              <div className='w-3/4'>
                <Input variant='bordered' isRequired label='Vorname' name='surname' />
                <Spacer y={2} />
                <Input variant='bordered' isRequired label='Nachname' name='lastname' />
              </div>
            </div>
            <Spacer y={4} />
            <div className='flex flex-row w-full'>
              <Input variant='bordered' isRequired label='E-Mail' name='emai' />
              <Spacer x={4} />
              <Input variant='bordered' isRequired label='Benutzername' name='username' />
            </div>
            <Spacer y={4} />
            <div className='flex flex-row w-full'>
              <PasswordInput variant='bordered' />
            </div>
          </div>
        </div>
        <div className='w-full h-1/6 flex flex-row'>
          <div className='w-2/3 h-full'>

          </div>
          <div className='w-1/3 h-full flex flex-row items-center justify-center'>
            <Button size='lg' color="primary" variant="ghost">
              Abbrechen
            </Button>
            <Spacer x={4} />
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  )
}

async function handleAction(data: FormData) {
  'use server'

  console.log(data.get('username'));
  await new Promise(resolve => setTimeout(resolve, 5_000));
  console.log('done')
  return;
}
