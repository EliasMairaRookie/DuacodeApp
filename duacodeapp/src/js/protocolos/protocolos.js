import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cabecera from '../cabecera';
import { pdfjs } from 'react-pdf';
import PdfComp from './pdfComp';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const Protocolos = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [hasError, setHasError] = useState(false);

    const peticion_protocolos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/protocol/');
            console.log(response.data);
            setPdfFiles(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_protocolos();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera />
                <p>Puede que el servidor esté apagado o exista algún problema con el servidor</p>
            </div>
        );
    }

    return (
        <div className='Protocolos'>
            <Cabecera />
            <div>
                {pdfFiles.map(pdf => (
                    <div key={pdf.protocol_id}>
                        <h3>{pdf.title}</h3>
                        <button onClick={() => setSelectedPdf(pdf.protocol_id)}>
                            Mostrar
                        </button>
                    </div>
                ))}
            </div>
            {selectedPdf && (
                <div>
                    <PdfComp id={selectedPdf} />
                </div>
            )}
        </div>
    );
};

export default Protocolos;
