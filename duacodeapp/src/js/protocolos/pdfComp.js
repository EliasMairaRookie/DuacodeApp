import { useState, useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfComp({ id }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [mostrar, setMostrar] = useState(null);

    useEffect(() => {
        let file;
        const peticion_verPdf = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/pdfView/${id}`, {
                    responseType: 'blob'
                });
                file = URL.createObjectURL(response.data);
                setMostrar(file);
            } catch (error) {
                console.error('Error al recuperar los datos:', error);
            }
        };

        peticion_verPdf();

        // Liberar el recurso cuando el componente se desmonte
        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
        };
    }, [id]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if (!mostrar) {
        return <p>No hay archivo seleccionado</p>;
    }

    return (
        <div className='pdfDiv'>
            <p>
                Página {pageNumber} de {numPages}
            </p>
            <Document file={mostrar} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, index) => (
                    <Page 
                        key={`page_${index + 1}`}
                        pageNumber={index + 1} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false}
                    />
                ))}
            </Document>
        </div>
    );
}

export default PdfComp;
