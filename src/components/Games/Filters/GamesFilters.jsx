import React from 'react';
import PropTypes from 'prop-types';
import PlatformsFilter from './PlatformsFilter';

const GamesFilters = ({filters}) => {
  const platforms =
    filters.all_filtered_platforms?.all_nested_platforms.platforms_name_keyword
      .buckets || [];
  // const stores =
  //   filters.all_filtered_stores?.all_nested_stores.stores_name_keyword
  //     .buckets || [];
  // const releases =
  //   filters.all_filtered_release_years_histogram?.all_nested_release_years
  //     .releases_over_time.buckets || [];
  // const locations =
  //   filters.all_filtered_locations?.all_nested_locations.locations_name_keyword
  //     .buckets || [];
  // const genres =
  //   filters.all_filtered_genres?.all_nested_genres.genres_name_keyword
  //     .buckets || [];

  return (
    <div className="text-white flex space-x-3">
      <PlatformsFilter data={platforms} />
    </div>
  );
};

GamesFilters.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default GamesFilters;