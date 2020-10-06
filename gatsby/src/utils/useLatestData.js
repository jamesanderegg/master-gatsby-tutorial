import { useEffect, useState } from 'react';

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
        query: `
            query {
                StoreSettings(id: "downtown"){
                    name
                    slicemaster {
                        name
                    }
                    hotSlices {
                        name
                    }
                }
            }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // CHECK FOR ERRORS
        // set data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return { hotSlices, slicemasters };
}
