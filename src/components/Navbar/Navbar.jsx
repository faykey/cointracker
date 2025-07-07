import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    const { setCurrency } = useContext(CoinContext)
    
    const currencyHandler = (event) => {
        switch (event.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" });
                break;
            }
            case "gbp":
                setCurrency({ name: "gbp", symbol: "£" });
                break;
            case "jpy":
                setCurrency({ name: "jpy", symbol: "¥" });
                break;
            case "inr":
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            case "cad":
                setCurrency({ name: "cad", symbol: "C$" });
                break;
            case "ngn": {
                setCurrency({ name: "ngn", symbol: "₦" });
                break;
            }
            default : {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
        }
    }

  return (
      <div className="navbar">
          <NavLink to="/">
              <img src={logo} alt="logo" className="logo" />
          </NavLink>
          <ul>
              <li>
                  <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>HOME</NavLink>
              </li>
              <li>
                  <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>NEWS</NavLink>
              </li>
          </ul>

  
          <div className='nav-right'>
              <select onChange={currencyHandler}>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="jpy">JPY</option>
                  <option value="inr">INR</option>
                  <option value="cad">CAD</option>
                  <option value="aud">AUD</option>
                  <option value="ngn">NGN</option>
              </select>
          </div>
    </div>
  )
}
 
export default Navbar
