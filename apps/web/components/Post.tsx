import React from "react"

import "./components.css"

export type IPost = {
  id: number;
  title: string;
  body: string;
  date: String;
  image: string;
}


export function Post(props: Omit<IPost, "id">)
{
  return (
    <div className="post">
      <img src={props.image} alt={props.title}/>
      <div className="postDetails">
        <h1>{props.title}</h1>
        <p>{props.body}</p>
        <p>{props.date}</p>
      </div>
    </div>
  )
}