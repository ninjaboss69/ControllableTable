import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import "./globals.css";
import Places from "./places";
import { assets } from "../../assets";
import { current } from "@reduxjs/toolkit";

const Main = () => {
  const center = useMemo(() => ({ lat: 20.7855, lng: 97.036339 }), []);

  const [mapLoaded, setMapLoaded] = useState(false);

  // const [directions, setDirections] = useState();
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      mapId: "b181cac70f27f5e6",
    }),
    []
  );
  const mapRef = useRef();
  // const LatLngLines = ;
  const onLoad = useCallback((map) => {
    setMapLoaded(true);
    // console.log("onloaded");
    mapRef.current = map;
    return mapRef.current;
  }, []);
  const [office, setOffice] = useState();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [latLngLines, setLatLngLines] = useState([
    [
      { lat: 20.7855, lng: 97.036339 },
      { lat: 26.7855, lng: 87.036339 },
    ],
    [
      { lat: 45.1755, lng: 87.036339 },
      { lat: 25.7855, lng: 90.036339 },
    ],
    [
      { lat: 24.7855, lng: 87.036339 },
      { lat: 15.7855, lng: 46.036339 },
    ],
    [
      { lat: 36.7855, lng: 77.036339 },
      { lat: 55.7855, lng: 16.036339 },
    ],
    [
      { lat: 30.4455, lng: 77.036339 },
      { lat: 12.7855, lng: 16.036339 },
    ],
  ]);

  const houses = useMemo(() => {
    if (office) return generateHouses(office);
    else return generateHouses(center);
  }, [office]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "Your Key",
    libraries: ["places"],
  });

  useEffect(() => {
    // const geocoder = new google.maps.Geocoder(); // eslint-disable-line
    // geocoder
    //   .geocode({
    //     location: { lat: 43, lng: -80 },
    //   })
    //   .then((response) => console.log(response));
  }, []);

  const [markerList, setMarkerList] = useState([]);

  const checkSearOrNot = async ({ lat, lng }) => {
    const geocoder = new google.maps.Geocoder(); // eslint-disable-line

    return await geocoder
      .geocode({
        location: { lat, lng },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  // const spreadAlgorithm = ({ lat, lng }) => {
  //   // checkSearOrNot({ lat, lng });
  //   const spreadDistance = Math.random() - 0.5;
  //   const currentArray = [
  //     { lat: lat + spreadDistance, lng: lng + spreadDistance },
  //     { lat: lat, lng: lng + spreadDistance },
  //     { lat: lat + spreadDistance, lng: lng },
  //     { lat: lat - spreadDistance, lng: lng - spreadDistance },
  //     { lat: lat - spreadDistance, lng: lng },
  //     { lat: lat, lng: lng - spreadDistance },
  //   ];
  //   setMarkerList([...markerList, ...currentArray]);
  //   setTimeout(() => {
  //     let chosenOne =
  //       markerList[generateRandomInteger(0, markerList.length - 1)];

  //     console.log(chosenOne);
  //     if (chosenOne === undefined) {
  //       chosenOne =
  //         currentArray[generateRandomInteger(0, currentArray.length - 1)];
  //     }
  //     const plusOrMinus = Math.random() < 0.5;
  //     let latt;
  //     let lngg;
  //     if (plusOrMinus) {
  //       latt = chosenOne.lat + Math.random();
  //       lngg = chosenOne.lng - Math.random();
  //     } else {
  //       latt = chosenOne.lat - Math.random();
  //       lngg = chosenOne.lng + Math.random();
  //     }
  //     // latt = chosenOne.lat + Math.random();
  //     // lngg = chosenOne.lng + Math.random();
  //     spreadAlgorithm({ lat: latt, lng: lngg });
  //   }, 2000);
  // };

  // useEffect(() => {
  //   spreadAlgorithm({ lat: 43, lng: 50 });
  // }, []);
  // const markerList = [
  //   { lat: 43, lng: -80 },
  //   { lat: 43, lng: -90 },
  // ];
  // const drawLine = (marker1, marker2) => {
  //   const line = new window.google.maps.Polyline({
  //     path: [marker1, marker2],
  //     map: googleMap,
  //   });
  //   return line;
  // };
  // const fetchDirections = (house) => {
  //   if (!office) return;

  //   const service = new google.maps.DirectionsService(); // eslint-disable-line

  //   service.route(
  //     {
  //       origin: house,
  //       destination: office,
  //       travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
  //     },
  //     (result, status) => {
  //       if (status === "OK" && result) {
  //         setDirections(result);
  //       }
  //     }
  //   );
  // };

  if (!isLoaded) return <div>Loading</div>;

  function CustomAnimationMarker({ position, map }) {
    const [marker, setMarker] = useState(null);

    useEffect(() => {
      // Create a new instance of the Marker class
      const newMarker = new window.google.maps.Marker({
        position,
        map: map, // Assuming `map` is your Google Map object
        icon: "https://robohash.org/sailamin.png?size=50x50",
      });

      // Define a variable to keep track of the marker's current position
      let currentPosition = newMarker.getPosition();

      // Define the animation function
      let startTime = null;
      let duration = 1000; // Animation duration in milliseconds
      const animationInterval = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const offset = 0.01 * Math.sin(progress * Math.PI * 2); // Calculate the offset based on a sine wave
          currentPosition = new google.maps.LatLng( // eslint-disable-line
            currentPosition.lat(),
            currentPosition.lng() + offset
          ); // eslint-disable-line
          newMarker.setPosition(currentPosition);
          window.requestAnimationFrame(animationInterval); // Call the animation function again
        }
      };

      // Add an event listener to the marker to start the animation when the marker is clicked
      newMarker.addListener("click", () => {
        window.requestAnimationFrame(animationInterval);
      });

      // Set the marker state variable
      setMarker(newMarker);

      // Clean up the marker when the component unmounts
      return () => {
        newMarker.setMap(null);
      };
    }, [position]);

    return null; // We don't need to render anything for the marker
  }

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            // setLatLngLines([
            //   ...latLngLines,
            //   [{ ...position }, { lat: 20.7855, lng: 97.036339 }],
            // ]);
            // spreadAlgorithm(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && <p>Enter your office address</p>}
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {/* {directions && <DirectionsRenderer directions={directions} />} */}
        {/* <Marker position={center} /> */}
        {office && (
          <>
            <Marker position={office} />
            <MarkerClusterer>
              {(clusterer) =>
                houses.map(
                  (house) =>
                    house.lat < 20 ? (
                      // <Marker
                      //   key={house.lat}
                      //   position={house}
                      //   clusterer={clusterer}
                      //   animation={google.maps.Animation.BOUNCE} // eslint-disable-line
                      //   icon={"https://robohash.org/sailaminoak.png?size=50x50"}
                      //   onClick={() => {
                      //     // fetchDirections(house);
                      //     setShowInfoWindow(true);
                      //   }}
                      // />
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        animation={google.maps.Animation.BOUNCE} // eslint-disable-line
                        icon={"https://robohash.org/sailaminoak.png?size=50x50"}
                        onClick={() => {
                          // fetchDirections(house);
                          setShowInfoWindow(true);
                        }}
                      >
                        {showInfoWindow && (
                          <InfoWindow>
                            <div>This is data in long form</div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ) : (
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        animation={google.maps.Animation.BOUNCE} // eslint-disable-line
                        icon={"https://robohash.org/sailaminoak.png?size=50x50"}
                        onClick={() => {
                          // fetchDirections(house);
                          setShowInfoWindow(true);
                        }}
                      >
                        {showInfoWindow && (
                          <InfoWindow>
                            <div>This is data in long form</div>
                          </InfoWindow>
                        )}
                      </Marker>
                    )
                  // <CustomAnimationMarker
                  //   key={house.lat}
                  //   clusterer={clusterer}
                  //   position={house}
                  //   map={mapRef.current}
                  // />
                )
              }
            </MarkerClusterer>
            <MarkerClusterer>
              {(clusterer) =>
                markerList?.map((marker) => (
                  <Marker
                    clusterer={clusterer}
                    key={marker.lat}
                    position={marker}
                    animation={google.maps.Animation.BOUNCE} // eslint-disable-line
                    icon={"https://robohash.org/sainayminoak.png?size=50x50"}
                    onClick={() => {
                      // fetchDirections(house);
                    }}
                  />
                ))
              }
            </MarkerClusterer>

            {markerList?.map((marker) => (
              <Marker
                key={marker.lat}
                position={marker}
                animation={google.maps.Animation.DROP} // eslint-disable-line
                icon={"https://robohash.org/sainayminoak.png?size=50x50"}
                onClick={() => {
                  // fetchDirections(house);
                }}
              />
            ))}
            <Circle center={office} radius={3000} options={closeOptions} />
            <Circle center={office} radius={5000} options={middleOptions} />
            <Circle center={office} radius={10000} options={farOptions} />

            {latLngLines.map((position) => (
              <Polyline
                key={position[0].lat}
                path={position}
                options={{
                  strokeColor: "#ff2343",
                  strokeOpacity: "1.0",
                  strokeWeight: 2,
                }}
              />
            ))}
          </>
        )}
      </GoogleMap>
    </div>
  );
};
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#32c25b",
  fillColor: "##32c25b",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

export default Main;


