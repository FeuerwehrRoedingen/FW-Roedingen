"use client"
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Divider, Select, SelectItem, Image } from '@nextui-org/react'

import { Article } from "utils/data/borrow"

type IProps = {
  article: Article;
}
export default function(props: IProps){

  const [selected, setSelected] = React.useState(0);

  const items = Array.from(Array(props.article.quantity +1).keys()).map((i) => {
    return (
      <SelectItem key={i} textValue={`${i}`}>{i}</SelectItem>
    )
  
  });

  return (
    <Card key={`${props.article.name}-card`} className='w-1/4 h-fit'>
      <CardHeader>
        {props.article.name}
      </CardHeader>
      <Divider />
      <CardBody>
        <Image 
          src={props.article.image}
          className='mb-2'
        />
        <p>{props.article.description}</p>
        <p>Verfügbar: {props.article.quantity - selected}</p>
        <div className='w-full h-fit flex flex-row items-center justify-end'>
          <div className='w-1/3'>
            <Select
              label="Anzahl"
              selectedKeys={new Set([`${selected}`])}
              onChange={e => setSelected(parseInt(e.target.value))}
              variant='bordered'
              className='max-w-xs'
              name={props.article.name}
              popoverProps={{placement: 'top'}}
            >
              {items}
            </Select>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
