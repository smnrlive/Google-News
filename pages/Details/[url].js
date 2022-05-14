import getConfig from "next/config";
import { NextSeo } from "next-seo";

function Movie({ movie }) {
  const SEO = {
    title: movie.title,
    description: movie.description,
    image: movie.image,

    openGraph: {
      title: movie.title,
      description: movie.description,
      image: movie.image,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <div variant="container">
        <div as="h2" my={40}>
          {movie.title}
        </div>
        <div maxWidth={600}>
          <img src={movie.image} alt={movie.title} />
          <p dangerouslySetInnerHTML={{ __html: movie.description }}></p>
        </div>
      </div>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${publicRuntimeConfig.API_OG}/api?url=${query.url}`
  );
  const movie = await res.json();
  return {
    props: { movie },
  };
}

export default Movie;
