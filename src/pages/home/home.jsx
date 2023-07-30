import videoHome from '../../assets/video.webm';
import Frame851 from '../../assets/Frame-851.svg';
import Frame891 from '../../assets/Frame-891.svg';
import Frame890 from '../../assets/Frame-890.svg';

export default function Home() {
  return (
    <div className='overflow-hidden'>
        <main>
          <section className="bg-black h-[573px] w-screen text-center relative overflow-hidden">
            <header className="z-30 relative">
              <p className="text-white text-5xl drop-shadow pt-80">
                Si es un Blue Label lo encontras aquí.
              </p>
            </header>
            <footer></footer>
            <div className="absolute top-0 bottom-0 z-10">
              <video autoPlay muted loop src={videoHome}></video>
            </div>
          </section>
          <section className="flex flex-row justify-center items-center p-10">
            <a
              className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
              href="/categoria-producto/usados"
            >
              <div>
                <img
                  src={Frame851}
                  alt="Elixir Logo"
                  className="dark:invert"
                  width="100px"
                  height="56px"
                />
              </div>
              <div>
                <p className="text-base leading-5 tracking-tight font-bold">
                  USADOS
                </p>
                <h4 className="leading-normal text-sm">Comprar / Vender </h4>
              </div>
            </a>
            <a
              className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
              href="/categoria-producto/0km"
            >
              <div>
                <img
                  src={Frame891}
                  alt="Elixir Logo"
                  className="dark:invert"
                  width="100px"
                  height="56px"
                />
              </div>
              <div>
                <p className="text-base leading-5 tracking-tight font-bold">O KM</p>
                <h4 className="leading-normal text-sm">¡Todas las Marcas!</h4>
              </div>
            </a>
            <a
              className="flex justify-center items-center p-4 m-2 w-96 bg-gray-100 border border-gray-200 box-border shadow-md rounded-md hover:border-yellow-600"
              href=""
            >
              <div>
                <img
                  src={Frame890}
                  alt="Elixir Logo"
                  className="dark:invert"
                  width="100px"
                  height="56px"
                />
              </div>
              <div>
                <p className="text-base leading-5 tracking-tight font-bold">
                  PLAN DE AHORRO
                </p>
                <h4 className="leading-normal text-sm">
                  ¡Planes Seguros y Confiables!
                </h4>
              </div>
            </a>
          </section>
        </main>
    </div>)

}
