import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import "../styles/map.css";
import "../styles/button.css";
import "../styles/pages/Orfanato.css";
import { useParams } from "react-router";

interface Orfanato {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    sobre: string;
    instrucoes: string;
    horario: string;
    final_de_semana: boolean;
    imagens: Array<Imagem>;
}

interface Imagem {
    url: string;
    id: string;
}

interface RouteParams {
    id: string;
}

function Orfanato() {
    
    const params = useParams<RouteParams>();
    const [orfanato, setOrfanato] = useState<Orfanato>();
    const [imagemAtiva, setimagemAtiva] = useState(0);

    useEffect(() => {
        api.get(`orfanatos/${params.id}`).then((response) => {
            setOrfanato(response.data)
        })
    }, [params.id]);

    if (!orfanato) {
        return (
            <p>Carregando...</p>
        )
    }

    return (
        <div id="page-orfanato">
            <Sidebar />

            <main className="with-sidebar">
                <div className="orfanato-detalhes">
                    {orfanato.imagens.length > 0 && (
                        <img src={orfanato.imagens[imagemAtiva].url} alt={orfanato.imagens[imagemAtiva].id} />
                    )}

                    <div className="images">
                        {orfanato.imagens.map((imagem, index) => {
                            return (
                                <button 
                                    key={imagem.id}
                                    className={imagemAtiva === index ? 'active' : ''}
                                    type="button"
                                    onClick={() => {
                                        setimagemAtiva(index)
                                    }}
                                >
                                    <img src={imagem.url} alt={imagem.id}/>
                                </button>
                            )
                        })}                        
                    </div>

                    <div className="orfanato-detalhes-conteudo">
                        <h1>{orfanato.nome}</h1>

                        <p>{orfanato.sobre}</p>

                        <div className="map-container">
                            <MapContainer
                                id="mapid"
                                center={[orfanato.latitude, orfanato.longitude]}
                                zoom={16}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[orfanato.latitude, orfanato.longitude]}
                                />
                            </MapContainer>

                            <footer>
                                <a                                    
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude},${orfanato.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >                                
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr/>

                        <h2>Instruções para visitas</h2>

                        <p>
                            Venha como se sentir mais à vontade e traga muito amor e carinho
                        </p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                <p>
                                    Segunda a Sexta <br/>
                                    {orfanato.horario}
                                </p>
                            </div>    

                            {orfanato.final_de_semana ? (
                                <div className="open-on-weekends open">
                                    <FiInfo size={32} color="#39CC83" />
                                    <p>
                                        Atendemos aos finais de semana
                                    </p>
                                </div>
                            ) : (
                                <div className="open-on-weekends closed">
                                    <FiInfo size={32} color="#FF669D" />
                                    <p>
                                        Não atendemos aos finais de semana
                                    </p>
                                </div>
                            )}                                                            
                        </div>
                                            
                        <a
                            href="https://api.whatsapp.com/send?1=pt_BR&phone={{orfanato.whatsapp}}&text=Oi, quero conhecer o orfanato."
                            target="_blank"
                            className="primary-button"
                            type="button"
                        >
                            <FaWhatsapp
                                size={20} 
                                color="#FFF"                         
                            />
                            Entrar em contato
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Orfanato;
