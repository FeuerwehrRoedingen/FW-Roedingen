
type IDs = {
  id: string;
  parent_id: string|undefined;
}

async function getPostIDs(limit: number) :Promise<IDs[]>
{
  try
  {
    const response = await fetch(
      `https://graph.facebook.com/v16.0/FreiwilligeFeuerwehrTitzLGRoedingen/?fields=posts.limit(${limit})%7Bparent_id%7D&access_token=${process.env.FACEBOOK_TOKEN}`
    );
    return (await response.json()).posts.data;
  }
  catch (error)
  {
    console.error(error);
    return [];
  }
}
async function getPostFromID(id: number)
{
  try
  {
    const response = await fetch(
      `https://graph.facebook.com/v16.0/${id}?fields=full_picture,story,created_time&access_token=${process.env.FACEBOOK_TOKEN}`
    );
    return await response.json();

  }
  catch (error)
  {
    console.error(error);
  }
}

export async function getPosts(limit: number)
{
  const data = await getPostIDs(limit);
  
}