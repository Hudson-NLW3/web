import '../styles/sidebar.css';

import mapMarker from '../images/map-marker.svg'
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

function Sidebar() {
  const { goBack } = useHistory();

  return (
    <div id="page-add-orfanato">
      <aside className="animate-right sidebar">
        <Link to="/">
            <img className="logo" src={mapMarker} alt="Happy" />          
        </Link>

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={20} color="white" />            
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default Sidebar;