import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"

import AppIcon, { App } from "components/appIcon"
import { proxy } from 'utils/handler/handleProxy'

const apps: App[] = [
  {
    name: 'mail',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Mail_fluent_Icon.svg',
    href: 'https://id.ionos.de/identifier'
  },
  {
    name: 'NextCloud',
    icon: proxy('https://cdn.icon-icons.com/icons2/2699/PNG/512/nextcloud_logo_icon_168948.png'),
    href: 'https://nextcloud.feuerwehr-roedingen.de',
    background: 'bg-gray-300',
    padding: 4
  },
  {
    name: 'GroupAlarm',
    icon: proxy('https://app.groupalarm.com/assets/favicon/favicon.png'),
    href: 'https://app.groupalarm.com/de/login',
    background: 'bg-gray-300',
    padding: 6
  },
  {
    name: 'Door',
    icon: proxy('https://feuerwehr-roedingen.de/favicon.ico'),
    href: 'https://door.feuerwehr-roedingen.de',
    background: 'bg-gray-300',
    padding: 4
  },
]

export default function AppsCard(){

  const appIcons = apps.map((app) => {
    return <AppIcon {...app} key={`${app.name}-icon`}/>
  });

  return (
    <Card>
      <CardHeader>
        <h1> Apps</h1>
      </CardHeader>
      <Divider />
      <CardBody className="">
        <div className=" inline-flex flex-row flex-wrap gap-3">
          {appIcons}
        </div>
      </CardBody>
    </Card>
  )
}
