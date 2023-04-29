"use client"

import Link from 'next/link';
import React from 'react'
import { isBrowser } from 'react-device-detect';
import { IPost, Post } from '../components/Post';

async function getFacebookFeed(start:number = 0, limit:number = 3): Promise<IPost[]>{
  const res = await fetch(`/api/posts?start=${start}&limit=${limit}`);

  if(res.status === 200){
    return await res.json();
  }else{
    return [];
  }
}

export default function(){

  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [start, setStart] = React.useState(0);

  React.useEffect(() => {
    getFacebookFeed(start).then((posts) => {
      setPosts(posts);
    });
  }, [start]);

  const loadMore = () => {
    setStart(start + 3);
  }
  const loadPrevious = () => {
    setStart(start - 3);
  }

  const elements = posts.map((post) => {
    return (
      <Post key={post.id} {...post}/>
    )
  });

  return (
    <>
      <div className="page">
        <div className='middle'>
          <div className="image-container"></div>
          <div className='socials'>
            <h1>Wir sind auch auf Social Media zu finden</h1>
            <div className="social-links">
              <a href="https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/" target="_blank">
                <img src="/img/facebook.webp" alt="Facebook" width="100%"/>
              </a>
              <a href="https://www.instagram.com/feuerwehr_roedingen" target="_blank">
                <img src="/img/instagram.png" alt="Instagram" width="100%"/>
              </a>
            </div>
          </div>
          <div className='einsaetze'>
            <h1>Letzte Einsätze und Facebook Posts</h1>
            <div className='facebook-feed'>
              <div className='posts'>
                {elements}
              </div>
              <div className='posts-controll'>
                <button onClick={loadPrevious} disabled={start === 0}>zurück</button>
                <button onClick={loadMore}>weiter</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          {isBrowser && <h1>Herzlich Willkommen auf der offiziellen Website der FF-Rödingen</h1>}
          <div className='links'>
            <Link href="/impressum">
              Impressum
            </Link>
            <Link href="/impressum/datenschutz">
              Datenschutz
            </Link>
            <Link href="/impressum/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
