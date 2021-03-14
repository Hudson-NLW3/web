import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

import '../styles/pages/Orfanatos.css';

import mapMarker from '../images/map-marker.svg'
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orfanato {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
}

function Orfanatos() {    

    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([], );

    useEffect(() => {
        api.get('orfanatos').then((response) => {
            setOrfanatos(response.data)
        })
    }, [])

    return (
        <div className="pageOrfanatos">    
            <aside className="animateRight">
                <header>     
                    <Link to="/">
                        <img className="logo" src={mapMarker} alt="Happy" />
                    </Link>               
        
                    <h2>Escolha um orfanato no mapa</h2>
        
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>
                
                <footer>
                    <strong>Brasília</strong>               
                    <p>Distrito Federal</p>
                </footer>        
            </aside>       


            <MapContainer                       
                center={[-15.8430724,-48.0307621]}
                zoom={15}
                className="map"
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {/* <TileLayer 
                   url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                /> */}

                {orfanatos.map(orfanato => {
                    return (
                        <Marker 
                            icon={mapIcon}
                            position={[orfanato.latitude,orfanato.longitude]}
                            key={orfanato.id}               
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}                        
                            >
                                {orfanato.nome}
                                <Link to={`/orfanato/${orfanato.id}`}>
                                    <FiArrowRight size={20} color="white" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
                

            </MapContainer>                        

            <Link to="/orfanato/add" className="criarOrfanato" title="Cadastre um orfanato">
                <FiPlus size={32} color="#FFF"/>                            
            </Link>                 
        </div>
    );

}

export default Orfanatos;
