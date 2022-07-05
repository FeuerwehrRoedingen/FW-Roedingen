import Header from "src/components/Header/Header";

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default PageLayout
