import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import Link from "next/link";

const PoolRender = (props) => {
  const [image, setImage] = useState("");
  const { idoAddress } = props;

  const idoInfo = props.pool;

  const card = useRef(null);

  useEffect(() => {
    setImage(idoInfo.metadata);
  }, [idoInfo]);
  return (
    <div ref={card} style={{ maxWidth: 500, margin: 20, minWidth: 400 }}>
      <Link href={`/launchpad/${idoInfo.idoAddress}`}>
        <div>
          <div style={{ paddingLeft: 5 }}>
            <p>
              {idoInfo.tokenName}
            </p>
            <p>${idoInfo.tokenSymbol}</p>
          </div>
        </div>
        <div>
          {parseInt(idoInfo.end) < parseInt(Date.now() / 1000) ? (
            <div>Ended</div>
          ) : parseInt(idoInfo.start) < parseInt(Date.now() / 1000) ? (
            <div >Started</div>
          ) : (
            <div>Not started</div>
          )}
        </div>
        <p>Description</p>
        <p>{idoInfo.metadata.description}</p>
        <div >
          <div >
            <p>Soft cap</p>
            {idoInfo.softCap}
          </div>
          <div >
            <p>Hard cap</p>
            {idoInfo.hardCap}
          </div>
        </div>
        <p>
          {parseInt(idoInfo.start) < new Date(Date.now() / 1000)
            ? "End in"
            : "Start in"}
        </p>
        <Countdown
          date={
            parseInt(idoInfo.start) < new Date(Date.now() / 1000)
              ? parseInt(idoInfo.end) * 1000
              : parseInt(idoInfo.start) * 1000
          }
        />
        <p>Progress</p>
        <p>{idoInfo.progress}</p>
      </Link>
    </div>
  );
};
export default PoolRender;

