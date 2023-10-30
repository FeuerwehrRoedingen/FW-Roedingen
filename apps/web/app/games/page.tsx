import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { BsQuestionDiamondFill } from 'react-icons/bs'
import { PiDotsNineBold } from 'react-icons/pi'
import { LuRadioTower } from 'react-icons/lu'

import Card from './card'

async function Page() {

  return (  
    <div className="w-full h-full flex flex-row items-center justify-evenly">
      <Card title="Bingo" href="/games/bingo">
        <PiDotsNineBold size={64} />
      </Card>
      <Card title="Quiz" href="/games/quiz">
        <BsQuestionDiamondFill size={64} />
      </Card>
      <Card title="Leitstelle" href="/games/leitstelle">
        <LuRadioTower size={64} />
      </Card>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games'
});
