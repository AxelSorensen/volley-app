import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapCSS from './Map.module.css';
import homeCSS from './Home.module.css';
import { FaVolleyballBall as IVolley } from "react-icons/fa";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import cx from 'classnames';
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const Map = () => {
    return ( 
        <GMap/>
     );
}

function GMap() {

  const myRef = useRef(null);


  const [courts, setCourts] = useState()
  const [selectedCourt, setSelectedCourt] = useState(null);

  const fetchCourts = async () => {
    let items = []
    let dbRef = collection(db, 'courts');
    let data = await getDocs(dbRef);
    for(const doc of data.docs){
        const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${doc.data().location._lat},${doc.data().location._long}&key=AIzaSyD2wwNtai79AIO8C_6_uEclATxpIfOq6is`);
        const address = await data.json();
        const name = (address.results[0].formatted_address).split(',')[0];
        items.push({...doc.data(), id: doc.id, name: name})
    }
    setCourts(items);
  }
  
  useEffect(() => {
    fetchCourts();
  },[])

  // useEffect(()=> {
  //   if(selectedCourt) {
  //     document.getElementById(selectedCourt.id).scrollIntoView({behavior: "smooth", inline: "center"});
  //   }
  //   console.log('render because of selected court')
    
  // },[selectedCourt])
  
    //Maybe add a useMemo so the currentposition is not updated on refresh
    const [currentPosition, setCurrentPosition] = useState(null);

    const options = {
      disableDefaultUI: true
    }

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    },[])

    const panTo = useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat,lng});
      mapRef.current.setZoom(16);
    },[])

    useEffect(()=> {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        }
        )
      }, () => console.log('failed'), {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      } )
    },[])
  
    function getDistanceTo(location) {
      return window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng), new window.google.maps.LatLng(location._lat, location._long))
    }

    const [selected, setSelected] = useState(null);
    const [openMap, setOpenMap] = useState(false);

    const toggleStyles = (item) => {
      if(item === selectedCourt) {
        return cx(mapCSS.scroll_item, mapCSS.selected)
      } else {
        return cx(mapCSS.scroll_item)
      }
    }

    return (
        <>
        <div className={homeCSS.top}>
          <h3 className={homeCSS.first_line}>Court info</h3>
          <div className={homeCSS.card_container}>
            <div className={cx(homeCSS.card, mapCSS.big_card)}>
              <div className={homeCSS.card_text_container}>
              <p className={mapCSS.small_text}><b>Location: </b>{selectedCourt?.name? selectedCourt.name : 'Missing' }</p>
              <p className={mapCSS.small_text}><b>Number of courts: </b>{selectedCourt?.number_of_courts? selectedCourt.number_of_courts: 'Missing'}</p>
              <p className={mapCSS.small_text}><b>Type: </b>{selectedCourt?.type? selectedCourt.type : 'Missing'}</p>
              <p className={mapCSS.small_text}><b>Description </b>{selectedCourt && selectedCourt.description ? selectedCourt.description : 'Missing' }</p>
              </div>
              {selectedCourt?.url ? <img className={mapCSS.court_pic} src={selectedCourt.url} alt="" /> : <div className={mapCSS.no_photo}>No photo</div>}
            </div>
          </div>
        </div>
        <div className={mapCSS.middle}>
          <img onClick={() => setOpenMap(!openMap)} className={mapCSS.fullscreen} src="https://img.icons8.com/plumpy/344/full-screen.png" alt="map-open-icon"/>
          <GoogleMap 
          onLoad={onMapLoad} 
          options={options} 
          zoom={10} 
          center={currentPosition} 
          mapContainerStyle={{height: openMap ? '160%': '80%'}}
          mapContainerClassName={mapCSS.map_container}

          >
            {courts?.map(item => 
            <Marker 
              key={item.id} 
              position={{lat: item.location._lat, lng: item.location._long}}
              icon={{
                url: 'https://img.icons8.com/office/344/volleyball.png',
                scaledSize: new window.google.maps.Size(30,30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15)
              }}
              onClick={() => {
                setSelected(item);
                setSelectedCourt(item);
                panTo({lat: item.location._lat, lng: item.location._long});
              }}
              />)}
              {currentPosition && 
            <Marker 
              position={{lat: currentPosition.lat, lng:currentPosition.lng}}
              icon={{
                url: 'https://img.icons8.com/emoji/344/red-circle-emoji.png',
                scaledSize: new window.google.maps.Size(20,20),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15)
              }}
            />}
        </GoogleMap>}
        { selectedCourt && <a href={`https://maps.google.com?q=${selectedCourt.location._lat},${selectedCourt.location._long}`} target='_blank' rel="noreferrer">Get directions</a> }
        </div>
        <div className={homeCSS.bottom} style={{display: openMap ? 'none' : 'grid'}}>
        <h3>Courts nearby</h3>
        <div className={homeCSS.scroll_wrapper}>
        {courts?.map((item) => (
                    <div ref={myRef} id={item.id} className={toggleStyles(item)} key={item.id+4} onClick={()=> {panTo({lat: item.location._lat, lng: item.location._long}); setSelectedCourt(item);}}>
                      <p>{item.name}</p>
                      <img className={mapCSS.court_icon} src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-beach-volleyball-summer-season-flaticons-lineal-color-flat-icons.png" alt="" />
                      <p>Distance: {currentPosition && (getDistanceTo(item.location)/1000).toFixed(2)} km.</p>
                    </div>
                ))}
        </div>
        </div>
        </>
    )
}
 
export default Map;