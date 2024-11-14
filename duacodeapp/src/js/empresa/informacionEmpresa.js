import MenuEmpresa from "./menuEmpresa";
import Cabecera from "../cabecera";
import '../../css/empresa/informacionEmpresa.css';

const InformacionEmpresa = () => {
    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />
            <div className="menu-infoImportante">
                <div className='ordenar'>
                    <MenuEmpresa EmpresaMenuActivo="infoEmpresa" />
                </div>
                <div className="informacion-lateralMenu">
                    <p>
                        En Duacode, nos dedicamos al desarrollo de software y soluciones tecnológicas innovadoras.
                        Nuestro enfoque principal es crear herramientas que mejoren la eficiencia interna de las empresas, adaptándonos a las necesidades específicas de cada cliente. 
                        Nos enorgullecemos de ofrecer productos personalizados y de alta calidad, que van desde aplicaciones de gestión empresarial hasta plataformas de comunicación interna.
                    </p>
                </div>
            </div>
            <div className="informacionExtra">
                <p>
                    Contamos con oficinas en varios puntos clave, lo que nos permite estar cerca de nuestros clientes y entender mejor sus necesidades. Nuestras sedes principales están en Madrid, desde donde coordinamos la mayor parte de nuestros proyectos, pero también tenemos presencia en otras ciudades, lo que nos permite colaborar con empresas a nivel nacional e internacional.
                </p>
                <p>
                    Estamos muy involucrados en el mundo deportivo, ya que creemos firmemente en los valores que el deporte representa: esfuerzo, trabajo en equipo y superación. Por eso, somos patrocinadores activos de diferentes eventos y equipos deportivos. Esto no solo refuerza nuestra identidad como empresa, sino que también nos permite conectar con la comunidad de una manera significativa, apoyando iniciativas que promueven la salud y el bienestar.
                </p>
            </div>
        </div>
    );
};
export default InformacionEmpresa;
   