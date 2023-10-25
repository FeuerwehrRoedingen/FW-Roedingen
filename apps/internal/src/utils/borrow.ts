
export type Article = {
  name: string;
  description: string;
  image: string;
  quantity: number;
}

const articles: Article[] = [
  {
    name: "Bierzelttische",
    description: "Bierzelttische für 10 Personen",
    image: "https://www.dammers.com/media/98/cf/56/1658880203/IMG415772_47308.jpg",
    quantity: 10
  },
  {
    name: "Bierzeltbänke",
    description: "Bierzeltbänke für 5 Personen",
    image: "https://www.bargusto.de/wp-content/uploads/2019/12/Gastamio-Bierzeltbank-e1597222062229.jpg",
    quantity: 20
  }
];

export async function getArticles() {
  setTimeout(() => {
  }, 1000);
  return articles;
}
