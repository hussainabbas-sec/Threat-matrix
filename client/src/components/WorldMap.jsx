import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";



export default function WorldMap({ logs }) {
  return (
    <ComposableMap
      projectionConfig={{ scale: 150 }}
      style={{ width: "100%", height: "300px" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#1e293b"
              stroke="#334155"
            />
          ))
        }
      </Geographies>

      {logs.map((log, i) => (
        <Marker key={i} coordinates={[log.lng, log.lat]}>
          <circle r={5} fill="#f43f5e" />
        </Marker>
      ))}
    </ComposableMap>
  );
}