import styles from './footer.module.css';

import Location from '../../assets/cloudinary/Footer/Vector.png'
import Phone from '../../assets/cloudinary/Footer/Phone.svg'
import Mail from '../../assets/cloudinary/Footer/Mail.svg'

import Facebook from '../../assets/cloudinary/Footer/Face.svg'
import Ig from '../../assets/cloudinary/Footer/Ig.png'
import Twitter from '../../assets/cloudinary/Footer/Twiter.svg'




const Footer = () => {


    return (
        <div className={styles.footerContainer}>
            <div className={styles.githubNames}>
                <h2>Github</h2>
                <ul className={styles.linkList}>
                    <li><a href="https://github.com/HGomezCamargo" target="_blank" rel="noopener noreferrer">HGomezCamargo</a></li>
                    <li><a href="https://github.com/JMRodriguezV98" target="_blank" rel="noopener noreferrer">Javier Mauricio Rodriguez Villamil</a></li>
                    <li><a href="https://github.com/williamsiann" target="_blank" rel="noopener noreferrer">williamsiann</a></li>
                    <li><a href="https://github.com/JFACUNDOSANCHEZ" target="_blank" rel="noopener noreferrer">JFACUNDOSANCHEZ</a></li>
                    <li><a href="https://github.com/YamilCondori" target="_blank" rel="noopener noreferrer">YamilCondori</a></li>
                    <li><a href="https://github.com/pabloponc" target="_blank" rel="noopener noreferrer">pabloponc</a></li>
                    <li><a href="https://github.com/DilanGerber" target="_blank" rel="noopener noreferrer">DilanGerber</a></li>
                    <li><a href="https://github.com/DMariaJimenez" target="_blank" rel="noopener noreferrer">Daniel Jimenez</a></li>
                </ul>
            </div>
            <div className={styles.contact}>
                <h2>Contact</h2>
                <ul className={styles.contactList}>
                    <li><img src={Mail} alt="" /><a >Roomproyect@gmail.com</a></li>
                    <li><img src={Phone} alt="" /><a >+54 2945 123456</a></li>
                    <li><img src={Location} alt="" /><a >avenida siempre viva calle 123</a></li>
                </ul>
            </div>
            <div className={styles.socialMedia}>
                <h2>Social Media</h2>
                <ul className={styles.socialMediaList}>
                    <li><img className={styles.imgSocialMedia} src={Facebook} alt="" /></li>
                    <li><img className={styles.imgSocialMedia} src={Ig} alt="" /></li>
                    <li><img className={styles.imgSocialMedia} src={Twitter} alt="" /></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
