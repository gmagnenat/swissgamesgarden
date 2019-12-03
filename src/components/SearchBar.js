import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import Games from './Games';
import {ReactiveBase, CategorySearch, DataSearch, ReactiveList, ResultCard} from "@appbaseio/reactivesearch";

const {ResultCardsWrapper} = ReactiveList;

const SearchBar = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchGames('');
  }, []);

  const searchGames = async query => {
    try {
      const qq = {
        query: {
          fuzzy: {
            title: {
              value: query,
              fuzziness: 'AUTO',
            }
          },
        }
      };
      console.log(JSON.stringify(qq))
      const response = await fetch(`http://localhost:9200/_search`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qq)
      });
      const results = await response.json();
      console.log(results.hits);
      setResults(results.hits.hits);
    } catch (error) {
      console.trace(error.message)
    }
  };

  const handleChange = e => {
    const search_query = e.target.value;
    searchGames(search_query);
  };
  return (
    <div>
      {/*<input type="text" onChange={handleChange}/>*/}
      {/*<Games games={results}/>*/}

      <p>Reactivesearch:</p>

      <ReactiveBase
        app="games_of_switzerland"
        url="http://localhost:9200"
        credentials="null"
      >
        <CategorySearch
          componentId="categorysearch"
          dataField={['name', 'title']}
          categoryField="title.keyword"
          placeholder="Search for games"
        />
        <DataSearch
          componentId="datasearch"
          dataField={['name', 'title', 'title.keyword']}
          fieldWeights={[1,3]}
          placeholder="Search games"
          autosuggest={true}
          showClear={true}
        />
        <ReactiveList
          componentId="SearchResult"
          dataField="title"
          react={{
            and: ['categorysearch', 'datasearch'],
          }}
          render={({ data }) => (
            <ResultCardsWrapper>
              {data.map(item => (
                <ResultCard key={item._id}>
                  <ResultCard.Image src={item.image} />
                  <ResultCard.Title
                    dangerouslySetInnerHTML={{
                      __html: item.title
                    }}
                  />
                  <ResultCard.Description>
                    {item.name}
                  </ResultCard.Description>
                </ResultCard>
              ))}
            </ResultCardsWrapper>
          )}
          loader="Loading Results.."
        />
      </ReactiveBase>
    </div>
  )
};

export default SearchBar;
