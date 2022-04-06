import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["field", "map", "latitude", "longitude"]

  connect() {
    if (typeof (google) != "undefined") {
      this.initializeMap()
    }
  }

  initializeMap() {
    this.map()
    this.setMarker()
    this.autoComplete()
  }

  map() {
    if(this._map == undefined) {
      this._map = new google.maps.Map(this.mapTarget, {
        center: new google.maps.LatLng(-15.7961, -47.9252),
        zoom: 17
      })
    }

    return this._map
  }

  setMarker() {
    if(this._marker == undefined) {
      this._marker = new google.maps.Marker({
        map: this.map(),
        anchorPoint: new google.maps.Point(0,0)
      })

      this._marker.setPosition({lat: -15.7961, lng: -47.9252})
      this._marker.setVisible(true)
    }

    return this._marker
  }

  autoComplete() {
    if(this._autocomplete == undefined) {
      this._autocomplete = new google.maps.places.Autocomplete(this.fieldTarget)
      this._autocomplete.bindTo('bounds', this.map())
      this._autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])
      this._autocomplete.addListener('place_changed', this.locationChanged.bind(this))
    }

    return this._autocomplete
  }

  locationChanged() {
    let place = this.autoComplete().getPlace()

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    this.map().fitBounds(place.geometry.viewport)
    this.map().setCenter(place.geometry.location)
    this.setMarker().setPosition(place.geometry.location)
    this.setMarker().setVisible(true)

    this.latitudeTarget.value = place.geometry.location.lat()
    this.longitudeTarget.value = place.geometry.location.lng()
  }
}
