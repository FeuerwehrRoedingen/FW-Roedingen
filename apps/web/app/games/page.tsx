import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { BsQuestionDiamondFill } from 'react-icons/bs'
import { PiDotsNineBold } from 'react-icons/pi'
import { LuRadioTower } from 'react-icons/lu'

async function Page() {

  return (  
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <ul>
        <li>
          <a href="/games/bingo" className="text-3xl flex flex-row items-center">
            <PiDotsNineBold size={40} className="mr-4"/>
            <span>Bingo</span>
          </a>
        </li>
        <li className="mt-8">
          <a href="/games/quiz" className="text-3xl flex flex-row items-center">
            <BsQuestionDiamondFill size={40} className="mr-4"/>
            <span>Quiz</span>
          </a>
        </li>
        <li className="mt-8">
          <a href="/games/leitstelle" className="text-3xl flex flex-row items-center">
            <LuRadioTower size={40} className="mr-4"/>
            <span>Leitstelle</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games'
});
