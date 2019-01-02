import React, {Component, Fragment} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class MapPage extends Component {
  constructor(){
    super();
    this.state = {
      rating: 0,
      price: 100
    }
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleRatingChange(event){
    const input = event.target.value
    this.setState({rating: input})
    console.log("event.target.value is", input);

  }

  handlePriceChange(event){
    const input = event.target.value
    this.setState({price: input})
    console.log("new max price is:", this.state.price);
    console.log("min rating is currently set to:", this.state.rating);
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
      {name: "The Chanter", latlng: [55.945691, -3.203956], price: 3.85, user: "Iain F", overall: 8, text: "aye \n it \r\n was \n alright", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/48421922_299090630718978_2522910274101444608_n.jpg?_nc_cat=104&_nc_ht=scontent-lhr3-1.xx&oh=8ba11ad1a4941613ab18f8ae4a0d40b8&oe=5CD8A21A"},
      {name: "Footlights", latlng: [55.946031, -3.203644], price: 4.30, user: "Hugh B", overall: 7.5, text: "Venue: Footlights, Edinburgh. Price: a not great £4.30. Head: Dara O'Briain here. Carbonation is pretty good, it's ice-cold, tastes like it should and it's in a classic glass. \n Tides looking okay so far too. \n Overall score: 7.5. Losing a point for the head and a point and a half for the price.", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/48396664_10156098120094639_4809002906269253632_n.jpg?_nc_cat=108&_nc_ht=scontent-lhr3-1.xx&oh=66030eafe5fdfeba5ecab4be49da0ad2&oe=5C9220CD"},
      {name: "Tiles", latlng: [55.953618, -3.192074], price: 4, user: "Chris R", overall: 5.5, text: "Tiles, St. Andrew Square. Head: 10/10, perfection. Carbonation: 7/10, upper middle of the road. Vessel: 10/10, classic conical glass. Price: 4/10 (£4.00) Taste: 6/10, almost lukewarm. Overall: 6.5/10. Balls to averages...... Non existent tide lines. On second thought, downgrade to a 5.5 please.", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/48950366_10156845868071704_5829290301742645248_n.jpg?_nc_cat=104&_nc_ht=scontent-lhr3-1.xx&oh=1ce950b7728ed552ef195b01eaafb46e&oe=5C913C70"},
      {name: "Dagda Bar", latlng: [55.942143, -3.183925], price: 3.70, user: "Michael C", overall: 9, text: "Venue: The Dagda. Price: 3.70. Head: Almost perfect, slight dip in the top. Carbonation excellent, temperature excellent, glass is your typical classic, and as flavoursome as you'd expect for someone who had two tabs on the way from his house. Score: 9. Its been a house classic for the ten years I've drank here and shows no sign of abating.", imageurl: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/48372275_10213230190056813_8284141510459392_n.jpg?_nc_cat=103&_nc_ht=scontent-lhr3-1.xx&oh=8453e512120e0fabbabc919a8b1d0321&oe=5CD4EB10"}
    ];

    const arrayOfFilteredPubs = []
    arrayOfAllPubsAndReviews.forEach((pub) => {
      if ((pub.overall >= this.state.rating) && (pub.price <= this.state.price)) {
        arrayOfFilteredPubs.push(pub)
      }
    })
    console.log("arrayOfFilteredPubs is:", arrayOfFilteredPubs);

    const LeafletMarkers = arrayOfFilteredPubs.map(pub => (
      <Marker icon={image} position={pub.latlng} key={`marker_${pub.name}`}>
        <Popup className="popup">
          <span>
            <b>{pub.name}</b>
            <br />
            £{pub.price.toFixed(2)} a pint
            <br />
            Reviewed by: {pub.user}
            <br />
            Overall: {pub.overall.toFixed(1)}
            <br />
            <br />
            "{pub.text}"
            <br />
            <br />
            <img src={pub.imageurl} className="review-image" alt="map pf edinburgh"/>
          </span>
        </Popup>
      </Marker>
    ));
    console.log("leaflet markers is:", LeafletMarkers);

    return(
      <Fragment>

        <h2>The Big Juicy Tracker</h2>

        <div className="filters">
          <h4>Filter by:</h4>

          <div className="dropdown">
            <label>Minimum rating:</label>
            <select name="rating" onChange={this.handleRatingChange}>
              <option key="0" value="0">0</option>
              <option key="1" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="dropdown">
            <label>Maximum price:</label>
            <select name="price" onChange={this.handlePriceChange}>
              <option key="0" value="0">0</option>
              <option value="2.50">£2.50</option>
              <option value="3">£3</option>
              <option value="3.25">£3.25</option>
              <option value="3.50">£3.50</option>
              <option value="3.75">£3.75</option>
              <option value="4">£4</option>
              <option value="4.25">£4.25</option>
              <option value="4.5">£4.50</option>
              <option value="4.75">£4.75</option>
              <option value="5">£5</option>
              <option value="6">£6</option>
            </select>
          </div>

        </div>


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
