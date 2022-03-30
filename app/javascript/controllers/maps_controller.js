import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["map"]

  connect() {
    if (typeof (google) != "undefined") {
      this.initializeMap()
    }
  }

  initializeMap() {
    this.initMap()
  }

  initMap() {
    this.map = new google.maps.Map(this.mapTarget, {
      center: new google.maps.LatLng(-15.7961, -47.9252),
      zoom: 17
    })

    this.marker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0,0)
    })

    this.marker.setPosition({lat: -15.7961, lng: -47.9252})
    this.marker.setVisible(true)
    return this.map
  }
}
