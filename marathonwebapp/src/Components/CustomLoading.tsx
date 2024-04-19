import { ColorRing } from "react-loader-spinner";
import { memo } from 'react';

const CustomLoading = () => {
  return (
    <div className="loadingContainer">
      <ColorRing
        visible={true}
        height="300"
        width="300"
        ariaLabel="color-ring-loading"
        colors={["#61dafb", "#4db6e2", "#38a1c9", "#247cb0", "#10679a"]}
      />
    </div>
  );
};

export default memo(CustomLoading);
