"use client";

import { useEffect, useState, useRef, MutableRefObject } from "react";
import dynamic from "next/dynamic";
import { MapPin, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap } from "leaflet";

interface LocationMarker {
  name: string;
  position: [number, number];
  color?: string;
  address: string;
}

interface MapComponentProps {
  locations: LocationMarker[];
  selectedLocation: string | null;
  mapRef: MutableRefObject<LeafletMap | null>;
}

const MapContent = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const locations: LocationMarker[] = [
    {
      name: "Yadav Amarjit",
      position: [28.51999999999999, 77.04745143338317],
      color: "bg-blue-500",
      address: "Gurugram, India",
    },
    {
      name: "You",
      position: [52.52, 13.405],
      color: "bg-green-400",
      address: "Berlin, Germany",
    },
  ];

  const handleLocationClick = (locationName: string) => {
    setSelectedLocation(locationName);
    const location = locations.find((loc) => loc.name === locationName);
    if (location && mapInstanceRef.current) {
      mapInstanceRef.current.setView(location.position, 11);
    }
    setShowSidebar(false);
  };

  return (
    <div className="relative h-[600px] w-full">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-4 right-4 z-[1000] md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        <MapPin className="h-6 w-6 text-gray-600" />
      </button>

      <div className="absolute md:relative w-fit top-[25%] h-fit  overflow-hidden bottom-0  z-[1000] py-2">
        <div className="">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-1"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`px-3  cursor-pointer transition-all duration-200 backdrop-blur rounded-r-md py-2 hover:bg-violet-900/10 `}
                onClick={() => handleLocationClick(location.name)}
              >
                <div className="flex items-center gap-2 relative px-3">
                  <div className="absolute  -left-1 top-1/2 size-3 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-white/40">
                    <div
                      className={`absolute inset-0 rounded-full ${location.color} -z-20 animate-ping [animation-duration:2s]`}
                    ></div>
                    <div
                      className={`absolute inset-0 rounded-full ${location.color} -z-10`}
                    ></div>
                  </div>

                  <span className="font-medium text-gray-700 ml-1 text-xs tracking-widest">
                    {location.name}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600  ml-4">
                  {location.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="absolute bottom-6 left-0 right-0 mx-auto w-[90%] md:w-[400px] z-[1000]">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
            {locations.find((loc) => loc.name === selectedLocation) && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      locations.find((loc) => loc.name === selectedLocation)
                        ?.color
                    }`}
                  />
                  <h3 className="font-semibold">
                    {
                      locations.find((loc) => loc.name === selectedLocation)
                        ?.name
                    }
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {
                    locations.find((loc) => loc.name === selectedLocation)
                      ?.address
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0">
        <MapWithNoSSR
          locations={locations}
          selectedLocation={selectedLocation}
          mapRef={mapInstanceRef}
        />
      </div>
    </div>
  );
};

const MapComponent = ({
  locations,
  selectedLocation,
  mapRef,
}: MapComponentProps) => {
  const { MapContainer, TileLayer, Marker } = require("react-leaflet");
  const L = require("leaflet");

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    const createCustomIcon = (
      color: string = "from-emerald-300 to-sky-400"
    ) => {
      const customPin = document.createElement("div");
      customPin.innerHTML = `
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-white/40">
          <div class="absolute inset-0 rounded-full ${color} -z-20 animate-ping [animation-duration:2s]"></div>
          <div class="absolute inset-0 rounded-full ${color} -z-10"></div>
        </div>
      `;

      return L.divIcon({
        html: customPin,
        className: "custom-marker-icon",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });
    };

    const icons = new Map();
    locations.forEach((location) => {
      icons.set(location.position.toString(), createCustomIcon(location.color));
    });

    const originalOnAdd = L.Marker.prototype.onAdd;
    L.Marker.prototype.onAdd = function (map: any) {
      const pos = this.getLatLng();
      const icon = icons.get(`${pos.lat},${pos.lng}`);
      if (icon) {
        this.setIcon(icon);
      }
      return originalOnAdd.call(this, map);
    };
  }, [locations]);

  const handleMapInit = (map: LeafletMap) => {
    mapRef.current = map;
  };

  return (
    <MapContainer
      center={[28.51999999999999, 77.04745143338317]}
      zoom={11}
      scrollWheelZoom={true}
      className="h-96 w-full"
      ref={handleMapInit}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.position}
          eventHandlers={{
            click: () => {
              if (mapRef.current) {
                mapRef.current.setView(location.position, 12);
              }
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

const MapWithNoSSR = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});

export default MapContent;
