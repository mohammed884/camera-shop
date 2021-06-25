import React from 'react'
import '../style/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <div className="footer">
            <footer>
                <h2>Made By Mohammed Abdulaziz</h2>
                <a rel="noreferrer" href="https://www.instagram.com/1kdd1/" target='_blank'><FontAwesomeIcon icon={faInstagram} className="icon"/></a>
            </footer>
        </div>
    )
}
