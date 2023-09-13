import Logo from './Logo';
import styles from './Sidebar.module.css'
import AppNav from './AppNav';
import Footer from './Footer'

const SideBarModule = () => {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Footer/>
          
         

            
        </div>
    );
}

export default SideBarModule;