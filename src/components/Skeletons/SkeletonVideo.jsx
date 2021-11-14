import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const SkeletonVideo = () => {
  return (
    <div>
      <SkeletonTheme color="#343a40" heightLightColor="#3c4147">
        <Skeleton height={180} />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            circle
            height={40}
            widht={40}
          />
          <Skeleton height={40} width="75%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonVideo;
