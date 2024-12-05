import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cabecera from '../cabecera';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { pdfjs } from 'react-pdf';
import PdfComp from './pdfComp';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '../../css/protocolos.css';
import WithLoader from '../WithLoader';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const Protocolos = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const peticion_protocolos = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/protocol/');
            setPdfFiles(response.data);
            setHasError(false);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        peticion_protocolos();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="protocolos" />
                <p>Puede que el servidor esté apagado o exista algún problema con el servidor</p>
            </div>
        );
    }

    return (
        <div className='Protocolos'>
            <Cabecera activePage="protocolos" />
            <div className='encuadre'>
                {/* Contenedor de botones y títulos de PDF */}
                <div className='pdfDisplay'>
                    <WithLoader isLoading={isLoading}></WithLoader>
                    {pdfFiles.map(pdf => (
                        <div key={pdf.protocol_id} className='individualPdf'>
                            <h3>
                                <FontAwesomeIcon icon={faFilePdf} /> {pdf.title}
                            </h3>
                            <button className='botonMostrar' onClick={() => setSelectedPdf(pdf.protocol_id)}>
                                Mostrar
                            </button>
                        </div>
                    ))}
                </div>

                {/* Contenedor de visualización del PDF */}
                {selectedPdf && (
                    <div className='pdf'>
                        <PdfComp id={selectedPdf} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Protocolos;
