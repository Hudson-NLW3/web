import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import styles from '../styles/pages/Landing.module.css'

import logoImg from '../images/logo.svg'

function Landing() {
  return (

    <div className={styles.pageLanding}>
      <div className={styles.container}>
        <header>
          <img className={styles.logo + ' animate-up'} src={logoImg} alt="Logomarca de Happy" />

          <div className={styles.location + 'animate-up'}>
            <strong>Brasília</strong>
            <p>Distrito Federal</p>
          </div>
        </header>

        <main>
          <h1 className="animate-up">Leve felicidade para o mundo</h1>

          <section className={styles.visit}>
            <p className="animate-up">
              Visite orfanatos e mude o dia de muitas crianças
            </p>
            <Link className="animate-up" to="/app" title="Visite orfanatos">
              <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Landing;
