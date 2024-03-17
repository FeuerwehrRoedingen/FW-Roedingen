
import type { Article } from 'utils/data/borrow'
import ArticleCard from './articleCard'

type IProps = {
  articles: Article[];
}
export default function(props: IProps) {

  const articles = props.articles.map((article) => <ArticleCard article={article} key={`${article.name}-card`}/>);

  return (
    <div className='w-full h-full flex flex-row items-center justify-evenly'>
      {articles}
    </div>
  )
}