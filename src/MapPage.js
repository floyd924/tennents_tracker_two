import React, {Component, Fragment} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class MapPage extends Component {
  constructor(){
    super();
    this.state = {}

  }



  render(){
    const startPosition = [55.945691, -3.203956];
    const startZoon = 12;
    const image = new L.Icon({
      iconUrl: require('./images/marker-icon.png'),
      shadowUrl: require('./images/marker-shadow.png'),
      iconSize:     [20, 40], // size of the icon
      shadowSize:   [1, 1], // size of the shadow
      iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [0, -50]// point from which the popup should open relative to the iconAnchor
    });
    const arrayOfAllPubsAndReviews = [
      // {name: , latlng: [,], price: , overall: , text: },
      {name: "The Chanter", latlng: [55.945691, -3.203956], price: 3.85, overall: 8, text: "aye it was alright", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/48421922_299090630718978_2522910274101444608_n.jpg?_nc_cat=104&_nc_ht=scontent-lhr3-1.xx&oh=8ba11ad1a4941613ab18f8ae4a0d40b8&oe=5CD8A21A"},
      {name: "Footlights", latlng: [55.946031, -3.203644], price: 4.30, overall: 7.5, text: "Venue: Footlights, Edinburgh. Price: a not great £4.30. Head: Dara O'Briain here Carbonation is pretty good, it's ice-cold, tastes like it should and it's in a classic glass. Tides looking okay so far too. Overall score: 7.5. Losing a point for the head and a point and a half for the price.", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/48396664_10156098120094639_4809002906269253632_n.jpg?_nc_cat=108&_nc_ht=scontent-lhr3-1.xx&oh=66030eafe5fdfeba5ecab4be49da0ad2&oe=5C9220CD"}
    ];
    const LeafletMarkers = arrayOfAllPubsAndReviews.map(pub => (
      <Marker icon={image} position={pub.latlng} key={`marker_${pub.name}`}>
        <Popup>
          <span>
            {pub.name}
            <br />
            £{pub.price.toFixed(2)} a pint
            <br />
            "{pub.text}"
            <br />
            <img src={pub.imageurl} className="review-image" alt="map pf edinburgh"/>
          </span>
        </Popup>
      </Marker>
    ));
    console.log("leaflet markers is:", LeafletMarkers);

    return(
      <Fragment>
        <h1>hello mum</h1>


        <div className="another-map-container">
          <Map className="this-is-map" center={startPosition} zoom={startZoon}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <style>@import url('http:/unpkg.com/leaflet@1.3.4/dist/leaflet.css')</style>

            <div className="markers-div">
              {LeafletMarkers}
            </div>

          </Map>
        </div>
      </Fragment>
    )








  }




}

export default MapPage;
