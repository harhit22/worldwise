import SideBarModule from "../components/SideBar";
import styles from "./AppLayout.module.css"
import Map from "../components/Map";
import User from "../components/User";


const AppLayout = () => {
    return (
        <div className={styles.app}>
           
            <SideBarModule/>
            <Map/>
            <User/>
            
            
        </div>
    );
}

export default AppLayout;
