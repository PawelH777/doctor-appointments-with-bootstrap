import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const Map = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCqV2K2u-BPJSZGgdnipAD94PDuEEXYJcs&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(() => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 37.390643, lng: -122.019689 }}
  >
    <Marker position={{ lat: 37.390643, lng: -122.019689 }} />
  </GoogleMap>
))

export default Map
