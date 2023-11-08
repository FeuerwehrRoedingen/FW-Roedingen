import { withMemberRoleRequired } from "utils/withRoleRequired"
import ArticleCards from "components/borrow/articleCards";

import { getArticles } from "utils/borrow";
import Confirm from "./confirm";

async function Page(){

  const articles = await getArticles();

  return (
    <div className="w-full h-full flex flex-row">
      <form className="w-full h-full">
        <div className="w-full h-5/6">
          <ArticleCards articles={articles}/>
        </div>
        <div className="w-full h-1/6">
          <Confirm />
        </div>
      </form>
    </div>
  )
}

export default withMemberRoleRequired(Page, { 
  returnTo: '/borrow'
});
