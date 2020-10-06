import { useEffect, useState } from 'react';

// fake out vs Code syntax highlighting to formate GQL without importing lib.
const gql = String.raw;

// interpolate string into gql query so we do not have to write it a bunch
const deets = ` 
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }`;
export default function useLatestData() {
  // hotslices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSliceMasters] = useState();

  // use a side effect to fetch data from sanity graphql endpoint
  useEffect(function () {
    // when the componet loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // CHECK FOR ERRORS
        // set data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  }, []);
  return { hotSlices, slicemasters };
}
