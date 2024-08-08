import { useEffect } from "react";

const NaverMap = ({ address }: any) => {
  useEffect(() => {
    const { naver }: any = window;

    async function getNaverMap() {
      if (!naver) {
        console.error("Naver Maps script not loaded");
        return;
      }

      const map = new naver.maps.Map("map");

      await naver.maps.Service.geocode(
        { query: address },
        function (status: any, response: any) {
          if (status !== 200) {
            return alert("Something went wrong!");
          }
          const result = response.v2.addresses[0];
          const coords = new naver.maps.LatLng(result.y, result.x);
          map.setCenter(coords);
          map.setZoom(15);
          new naver.maps.Marker({
            map: map,
            position: coords,
          });
        }
      );
    }
    getNaverMap();
  }, [address]);

  return <div id="map" className="w-full h-full rounded-xl"></div>;
};

export default NaverMap;
