//center : 5849 Marlow Dr. East Syracuse, NY 13057

//hospital list
//Upstate Golisano Children's Hospital
var map, popup, Popup;
// function initMap() {
//   //43.053861
//   //76.023728
//   // The location of home
//   var home = { lat: 43.053862, lng: -76.023825 };
//   // The map, centered at Uluru
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: home,
//     mapTypeId: "roadmap",
//   });
//   Popup = createPopupClass();
//   popup = new Popup(
//     new google.maps.LatLng(-33.866, 151.196),
//     document.getElementById("content")
//   );
//   popup.setMap(map);
// }

/** Initializes the map and the custom popup. */

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43, lng: -76 },
    zoom: 10,
    mapTypeId: "roadmap",
  });
  var hospital = { lat: 43.043915, lng: -76.139231 }; //Upstate Golisano Children's Hospital
  var image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  var marker = new google.maps.Marker({
    position: hospital,
    map: map,
    icon: image,
  });

  Popup = createPopupClass();
  popup = new Popup(
    new google.maps.LatLng(43.053861, -76.023728),
    document.getElementById("content")
  );
  popup.setMap(map);
}

/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    this.position = position;

    content.classList.add("popup-bubble");

    // This zero-height div is positioned at the bottom of the bubble.
    var bubbleAnchor = document.createElement("div");
    bubbleAnchor.classList.add("popup-bubble-anchor");
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement("div");
    this.containerDiv.classList.add("popup-container");
    this.containerDiv.appendChild(bubbleAnchor);

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function () {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function () {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? "block"
        : "none";

    if (display === "block") {
      this.containerDiv.style.left = divPosition.x + "px";
      this.containerDiv.style.top = divPosition.y + "px";
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}
