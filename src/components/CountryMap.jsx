import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const CountryMap = ({ country }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyAEHxs3k_zXC2btrtQzfc_YXJlszIhNMhw",
      version: "weekly",
    });

    loader.load().then(() => {
      if (country && country.maps && mapContainerRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: {
            lat: country.latlng[0],
            lng: country.latlng[1],
          },
          zoom: 6,
        });

        new google.maps.Marker({
          position: {
            lat: country.capitalInfo.latlng[0],
            lng: country.capitalInfo.latlng[1],
          },
          map: map,
          title: country.name.common,
        });
      }
    });
  }, [country]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "800px" }}></div>;
};


