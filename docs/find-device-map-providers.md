# Find My Device map providers

The Find My Device experience uses one client-side Leaflet renderer for the three geographic modes and the existing Three.js renderer for the globe. Coordinates remain in temporary React state; they are never sent to a new backend or persisted.

## Provider matrix

| Mode | Provider / source | Key or billing | Attribution and limitations |
| --- | --- | --- | --- |
| MAP | OpenStreetMap standard raster tiles | No API key. No billing account or card. | Visible OpenStreetMap contributors attribution. The public tile service is best-effort and subject to the [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/); the app only requests tiles for the active viewport and does not prefetch or cache an offline region. |
| SATELLITE | Esri World Imagery public REST tile endpoint | No API key in this fallback. No billing account or card is introduced. | Visible Esri / imagery-provider attribution. This is a public, no-key fallback with no availability SLA; a future authenticated Esri integration would need an appropriately restricted client token and should be reviewed before making it a requirement. |
| TERRAIN | Esri World Terrain Base public REST tile endpoint | No API key in this fallback. No billing account or card is introduced. | Visible Esri / USGS / NOAA attribution. This is a public, no-key fallback with no availability SLA; it supplies global shaded-relief elevation visualization without requiring a paid SDK. |
| GLOBE | Bundled NASA Blue Marble image, sourced from NASA Earth Observatory / Wikimedia Commons | No API key, network request, billing account, or card. | The bundled texture is a reduced 2048×1024 derivative of NASA's Blue Marble 2002 image. It is public domain in the United States as a NASA-created work; Snow credits NASA Earth Observatory in the UI and keeps the source record in version control. |

## Optional Google enhancement

`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is not required by the core experience and is not added to Render. If an operator later chooses to enable Google Maps, Google Maps JavaScript API requires a browser-exposed, domain-restricted public key, a Google Cloud billing account, and usage is governed by Google's current quota/pricing terms. Never put a server secret in `NEXT_PUBLIC_*` and never commit a key.

## Source records

- [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/)
- [Esri World Terrain Base service](https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer)
- [NASA Blue Marble: Next Generation](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/)
- [Bundled Blue Marble source record and public-domain notice](https://commons.wikimedia.org/wiki/File:Blue_Marble_2002.png)
- [Leaflet documentation](https://leafletjs.com/reference.html)
