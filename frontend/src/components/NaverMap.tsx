import React, { useEffect } from "react";

const NaverMap = ({ place }: any) => {
  useEffect(() => {
    const { naver }: any = window;

    if (!naver) {
      console.error("Naver Maps script not loaded");
      return;
    }

    console.log("Naver object loaded", naver);


    const map = new naver.maps.Map("map");

    naver.maps.Service.geocode(
      { query: "부평" },
      function (status: any, response: any) {
        console.log(response);
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
  }, [place]);

  return <div id="map" className="w-full h-full rounded-xl"></div>;
};

export default NaverMap;
