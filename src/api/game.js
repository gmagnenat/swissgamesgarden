import {getJsonApi} from 'config';
import {deserialise, query} from 'kitsu-core';
import {QueryClient, useQuery, dehydrate} from '@tanstack/react-query';

export const getGame = async ({queryKey}) => {
  const queryUrl = query({
    filter: {
      field_path: `/games/${queryKey[1]}`,
    },
    fields: {
      'node--game':
        'title,body,genres,studios,genres,stores,releases_normalized,release_platforms,website,locations,cantons,publishers,sponsors,social_networks,languages,awards,credits,completeness,members,images,contextual_links,sources,article_links',
      studios: 'title',
      'node--studio': 'title,field_path',
      'node--people': 'title,field_path',
      'taxonomy_term--genre': 'slug',
      'taxonomy_term--platform': 'slug',
      'taxonomy_term--location': 'name',
      'taxonomy_term--publisher': 'name',
      'taxonomy_term--sponsor': 'name',
      'taxonomy_term--language': 'name',
      'taxonomy_term--member': 'name',
    },
    include:
      'studios,release_platforms,genres,locations,cantons,publishers,sponsors,languages,members,images',
  });

  // console.log(`%cnode query: /node/game?${queryUrl}`, 'font-weight:bold;');

  const res = await fetch(`${getJsonApi()}/node/game?${queryUrl}`).catch(
    err => {
      console.log(err);
    }
  );
  const data = await res.json();

  return (await deserialise(data).data[0]) || null;
};

export const useGame = path => {
  return useQuery(['game', path], getGame);
};

export const prefetchGame = async ({query}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['game', query.path], getGame, {});

  return (
    queryClient && {
      props: {
        path: query.path,
        dehydratedState: dehydrate(queryClient),
      },
    }
  );
};
