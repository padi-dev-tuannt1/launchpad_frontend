import React, { useState, useEffect } from 'react'
import PoolRender from '../Card/PoolRender';
import { usePoolContext } from '@/context/PoolContext';

const IDOList = (props) => {
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  const { allPools } = usePoolContext();

  // sort IDOs by start time
  const poolKeys = Object.keys(allPools).sort((a, b) => allPools[b]?.start - allPools[a]?.start);

  const { owner, tokenAddress } = props;

  useEffect(() => {
    console.log("allPools", allPools);
  }, [allPools]);

  const loadmore = (amount) => {
    setLimit((p) => (p < allPools.length ? p + amount : p));
  };

  if (!poolKeys.length || !allPools) {
    return <p>Wait for pools' data to load... This may take more than 30 seconds.</p>
  }

  return (
    <div>
      {poolKeys.map((item, index) => {
        if (index >= limit) {
          return null;
        }
        if (owner && owner !== "") {
          if (allPools[item].owner.toLowerCase() !== owner.toLowerCase()) {
            return null;
          }
        }
        if (tokenAddress && tokenAddress !== "") {
          if (
            allPools[item].tokenAddress.toLowerCase() !==
            tokenAddress.toLowerCase()
          ) {
            return null;
          }
        }
        return (
          <PoolRender key={index} pool={allPools[item]}></PoolRender>
        );
      })}


      {limit >= poolKeys.length ? null : (
        <button>
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            await utils.timeout(1000);
            loadmore(6);
            setLoading(false);
          }}
          {loading ? "LOADING . . ." : "LOADMORE"}
        </button>
      )}
    </div>
  );

};

export default IDOList;