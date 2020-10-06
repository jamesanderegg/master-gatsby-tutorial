import React from 'react';
import useLatestData from '../utils/useLatestData';

// we cannont use gatsby to get data because there is no API after build time.
// So we must use the sanity API, client side, graphql endpoint to fetch the data

function CurrentlySlicing() {
  return (
    <div>
      <p>Currently slicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>Hotslices</p>
    </div>
  );
}
export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
