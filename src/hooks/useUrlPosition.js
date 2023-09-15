import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [serachParams, setSearchParam] = useSearchParams();
  console.log(setSearchParam);
  const lat = serachParams.get("lat");
  const lng = serachParams.get("lng");
  return [lat, lng];
}
