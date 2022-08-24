import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"; 
import { UserAuth } from "../Auth/Auth";
import { useNavigate } from 'react-router-dom';
import homeCSS from './Home.module.css';


const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, 'games');
  const { user, logout } = UserAuth();
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id 
      })))
    }
    getItems();
    
},[])

const handleLogout = async () => {
  try {
    await logout();
    navigate('/');
    console.log('You are logged out')
  } catch (e) {
    console.log(e.message);
  }
};

  return (
    <>
      <div className={homeCSS.top}>
        <h3 className={homeCSS.first_line}>Playing today</h3>
        <div className={homeCSS.card_container}>
        <div className={homeCSS.card}></div>
        <div className={homeCSS.card}></div>
      </div>
      </div>
      <div className={homeCSS.middle}>
        <h3>Courts nearby</h3>
        <div className={homeCSS.scroll_wrapper}>
          <div>first</div>
          <div>second</div>
          <div>third</div>
          <div>fourth</div>
          <div>fifth</div>
   
        </div>
      </div>
      <div className={homeCSS.bottom}>
        <h3>News</h3>
      </div>
    </>
  );
};

export default Home;

{/* <p>Max players: {item.max_players}</p>
          <p>Time: {new Date(item.time.seconds).toString()}</p>
          <p>Location: {item.location._lat}</p> */}