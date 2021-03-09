import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: mapElement,
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    // variable markers qui récupère tous les magasins
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log(markers);
    markers.forEach((marker) => {
      const element = document.createElement('i');
      element.classList.add('fas');
      element.classList.add('fa-map-marker-alt');
      // element.style.backgroundSize = 'contain';
      element.style.color = '#114D4D';
      element.style.width = '40px';
      element.style.height = '40px';
      new mapboxgl.Marker(element)
        .setLngLat([marker.lng, marker.lat])
        .addTo(map);
    });

    const fitMapToMarkers = (map, markers) => {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend([marker.lng, marker.lat]));
      map.fitBounds(bounds, { padding: 70, maxZoom: 14, duration: 0 });
    };

    fitMapToMarkers(map, markers);

    const addMarkersToMap = (map, markers) => {
      markers.forEach((marker) => {
        if (marker.found != "none") {
          const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // add this

          new mapboxgl.Marker()
            .setLngLat([marker.lng, marker.lat])
            .setPopup(popup) // add this
            .addTo(map);
        }

      });
    };

    addMarkersToMap(map, markers);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    // const form = document.getElementById('geo-search');
    // form.prepend(geocoder.onAdd(map));

    const locationLink = document.getElementById("geoloc");
    const place = document.getElementById("place");
    const submit = document.getElementById("search-submit");
    if (locationLink) {
      locationLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition((data) => {
          const currentPosition = [data.coords.latitude, data.coords.longitude];
          place.value = currentPosition;
          console.log(currentPosition);
          submit.click();
        });
      });
    }




  }

};

export { initMapbox };
