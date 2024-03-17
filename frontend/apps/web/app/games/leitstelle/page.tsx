
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Input, Radio, RadioGroup, Tooltip } from "@nextui-org/react";

import Card from './card'

import { createSession, joinSession } from 'utils/leitstelle/session'
import ControlledForm, { IState } from 'components/form/controlledForm';

async function handleCreate(prevState: any, formdata: FormData): Promise<IState> {
  "use server"
  try {
    const map = formdata.get('map');
    const result = await createSession({
      map: map as string,
      password: '1234',
      players: []
    })

    if(result.statusCode !== 201){
      return {
        error: JSON.stringify({name: result.statusCode, message: result.error, cause: result.message}),
        result: null
      }
    }
    return {
      error: null,
      result: result.data
    }
  }
  catch (error) {
    return {
      error: JSON.stringify(error),
      result: null
    }
  }
}
async function handleJoin(prevState: any, formdata: FormData): Promise<IState> {
  "use server"
  try {
    return {
      error: null,
      result: null
    }
  }
  catch (error) {
    return {
      error: JSON.stringify(error),
      result: null
    }
  }
}

async function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="w-1/2 h-1/2 min-w-[900px] min-h-[500px] bg-opacity-50 bg-ral-3001 border-2 border-ral-1026 rounded-2xl p-4"
      >
        <div className="w-full h-[12.5%] border-b-2 border-ral-1026 flex items-center justify-center">
          <h1 className="text-ral-1026">Feuerwehr Rödingen</h1>
        </div>
        <div className="w-full h-[87.5%] flex flex-row items-center justify-evenly opacity-100">
          <Card heading="Demo Modus ">
            <ControlledForm
              action={handleCreate}
              buttonText="Starten"
            >
              <RadioGroup
                name="map"
                color="warning"
                label="Karte Auswählen"
                defaultValue="TTZ"
              >
                <Radio value="TTZ">Titz</Radio>
                <Tooltip content="Bald verfügbar" placement="right">
                  <Radio value="JÜL" isDisabled>Jülich</Radio>
                </Tooltip>
                <Tooltip content="Bald verfügbar" placement="right">
                  <Radio value="NRV" isDisabled>Nörvenich</Radio>
                </Tooltip>
              </RadioGroup>
            </ControlledForm>
          </Card>
          <Card heading="Spiel starten">
            <ControlledForm
              action={handleJoin}
              buttonText="Beitreten"
            >
              <Input
                label="Session ID"
                variant="underlined"
                name="sid"
              />
              <Input
                label="Passwort"
                variant="underlined"
                name="password"
              />
            </ControlledForm>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games/leitstelle'
});
