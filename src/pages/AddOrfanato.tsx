import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/AddOrfanato.css';
import '../styles/form.css';
import '../styles/button.css';


function AddOrfanato() {

  const history = useHistory();

  const [posicaoInicial, setPosicaoInicial] = useState<[latitude: number, longitude: number]>([-15.8430724, -48.0307621])
  const [posicaoSelecionada, setPosicaoSelecionada] = useState<[latitude: number, longitude: number]>([0,0])

  const [nome, setNome] = useState('');
  const [sobre, setSobre] = useState('');
  const [instrucoes, setInstrucoes] = useState('');  
  const [horario, setHorario] = useState('');
  const [finalDeSemana, setFinalDeSemana] = useState(true);
  const [imagens, setImagens] = useState<File[]>([]);
  const [imagensPreview, setImagensPreview] = useState<string[]>([]);

  const Markers = () => {
    const map = useMapEvents({
      click(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setPosicaoSelecionada([lat, lng])
      }      
    })

    return (
      posicaoSelecionada ? 
          <Marker           
            key={posicaoSelecionada[0]}
            icon={mapIcon}
            position={posicaoSelecionada}            
          />
      : null
    )
  }  

  function handleSelecionarImagens(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    const imagensSelecionadas = Array.from(event.target.files)
    setImagens(imagensSelecionadas);

    const imagensSelecionadasPreview = imagensSelecionadas.map(image => {
      return URL.createObjectURL(image);
    })

    setImagensPreview(imagensSelecionadasPreview);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const [latitude, longitude] = posicaoSelecionada;

    const data = new FormData();

    data.append('nome', nome);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('sobre', sobre);
    data.append('instrucoes', instrucoes);
    data.append('horario', horario);
    data.append('final_de_semana', String(finalDeSemana));
    
    imagens.forEach(imagem => {
      data.append('imagens', imagem);
    })

    api.post('orfanatos', data)
    .then((response) => {
      alert('Cadastro realizado com Sucesso');
      history.push('/app');
    })
    .catch((error) => {
      alert('Não foi possível fazer o novo cadastro');
      console.log(error);
    })
    
  }

  return (
    <div id="page-add-orfanato">
      <Sidebar />

      <main className="animate-aparecer with-sidebar">
        <form onSubmit={handleSubmit} action="salvar-orfanato" method="POST">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
                id="mapid"
                center={posicaoSelecionada[0] !== 0 ? posicaoSelecionada : posicaoInicial}
                zoom={15}                                                
            >
                <Markers />
                
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />                
                
            </MapContainer>
            
            <br/>

            <div className="input-block">
              <label htmlFor="nome">Nome</label>
              <input 
                type="text" 
                name="nome" 
                id="nome" 
                required 
                value={nome}
                onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="sobre">
                Sobre <span>Máximo 300 caracteres</span>{" "}
              </label>
              <textarea 
                name="sobre" 
                id="sobre" 
                required
                value={sobre}
                onChange={event => setSobre(event.target.value)}
              ></textarea>
            </div>

            {/* <div className="input-block">
              <label htmlFor="whatsapp">Número do Whatsapp</label>
              <input 
                type="text" 
                name="whatsapp" 
                id="whatsapp" 
                required 
              />
            </div> */}

            <div className="input-block">
              <label>Fotos</label>

              <div className="images-container" id="images">

                {imagensPreview.map(imagem => {
                  return (
                    <img src={imagem} alt={imagem} key={imagem}/>
                  )
                })}

                <label 
                  htmlFor="imagens[]"
                >
                  <FiPlus
                    size={24}
                    color="#15B6D6"
                  />                
                </label> 

              </div>
              <input 
                type="file" 
                id="imagens[]"
                multiple
                onChange={handleSelecionarImagens}
              />               

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instrucoes">Instruções</label>
              <input
                type="text"
                name="instrucoes"
                id="instrucoes"
                required
                value={instrucoes}
                onChange={event => setInstrucoes(event.target.value)}
              ></input>
            </div>

            <div className="input-block">
              <label htmlFor="horario">Horário das visitas</label>
              <input 
                type="text" 
                name="horario" 
                id="horario" 
                required
                value={horario}
                onChange={event => setHorario(event.target.value)}
              ></input>
            </div>

            <div className="input-block">
              <label htmlFor="final_de_semana">Atende fim de semana?</label>
              <input
                type="hidden"
                name="final_de_semana"
                id="final_de_semana"
                value="1"
                required
              ></input>
            </div>

            <div className="button-select">
              <button                 
                type="button" 
                className={finalDeSemana ? 'active' : ''}
                onClick={() => setFinalDeSemana(true)}
              >
                Sim
              </button>
              <button                 
                type="button"
                className={!finalDeSemana ? 'active' : ''}
                onClick={() => setFinalDeSemana(false)}
              >
                Não
              </button>
            </div>
          </fieldset>

          <button type="submit" className="primary-button">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddOrfanato;
