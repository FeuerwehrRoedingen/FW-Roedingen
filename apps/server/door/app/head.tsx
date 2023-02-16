export default function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>FWR-Door</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Door to FWR Servers" />
      <link rel="icon" href="/img/favicon.ico" />
    </>
  );
}