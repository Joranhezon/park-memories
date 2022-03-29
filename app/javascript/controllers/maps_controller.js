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
      center: new google.maps.LatLng(39.5, -98.35),
      zoom: 4
    })
  }
}
