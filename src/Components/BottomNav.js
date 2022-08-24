import { FaHome as IHome, FaMap as IMap, FaUser as IUser, FaUsers as ISocial} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import navCSS from './BottomNav.module.css';
import cx from 'classnames';
import { UserAuth } from "../Auth/Auth";

const BottomNav = () => {
    const {user} = UserAuth();
    const style = { color: '#666', fontSize: '25px' }
    return ( 
        <>
        {user != null &&
        <nav className={navCSS["nav"]}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? cx(navCSS["nav_link"], navCSS["link_active"]) : navCSS["nav_link"])}>
                    <IHome style={style}/>
                <span className={navCSS["nav_text"]}>Feed</span>
            </NavLink>
            <NavLink
                to="/map"
                className={({ isActive }) => (isActive ? cx(navCSS["nav_link"], navCSS["link_active"]) : navCSS["nav_link"])}>
                    <IMap style={style}/>
                <span className={navCSS["nav_text"]}>Map</span>
            </NavLink>
            <NavLink
                to="/social"
                className={({ isActive }) => (isActive ? cx(navCSS["nav_link"], navCSS["link_active"]) : navCSS["nav_link"])}>
                    <ISocial style={style}/>
                <span className={navCSS["nav_text"]}>Feed</span>
            </NavLink>
            <NavLink
                to="/praktisk"
                className={({ isActive }) => (isActive ? cx(navCSS["nav_link"], navCSS["link_active"]) : navCSS["nav_link"])}>
                    <IUser style={style}/>
                <span className={navCSS["nav_text"]}>Profile</span>
            </NavLink>
        </nav>}
        </>
     );
}
 
export default BottomNav;