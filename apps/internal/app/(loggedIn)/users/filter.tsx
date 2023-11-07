import { Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Input, Spacer } from '@nextui-org/react'

export default function () {

  return (
    <Card className="w-full h-fit mb-8 bg-gray-900">
      <CardHeader title="Filter List">
        Suche
      </CardHeader>
      <Divider />
      <CardBody>
        <Input label="Filter" variant="underlined" />
        <Spacer y={4} />
        <CheckboxGroup label="Nur anzeigen, wenn">
          <Checkbox value="active" color="danger">aktiver Benutzer</Checkbox>
          <Checkbox value="members" color="danger">Mitglied der Löschgruppe</Checkbox>
        </CheckboxGroup>
      </CardBody>
    </Card>
  )
}
