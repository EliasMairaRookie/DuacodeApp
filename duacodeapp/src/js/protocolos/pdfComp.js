import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import WithLoader from '../WithLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfComp({ id }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Iniciar en la primera página
    const [mostrar, setMostrar] = useState(null);
    const [viewMode, setViewMode] = useState('page-by-page'); // Modo de visualización: 'page-by-page' o 'all-pages'
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let file;
        const peticion_verPdf = async () => {
            try {
                const response = await axios.get(`https://idkmen.pythonanywhere.com/pdfView/${id}`, {
                    responseType: 'blob'
                });
                file = URL.createObjectURL(response.data);
                setMostrar(file);
                setPageNumber(1); // Reiniciar a la primera página cuando se cargue un nuevo documento
                setIsLoading(false);
            } catch (error) {
                console.error('Error al recuperar los datos:', error);
                setIsLoading(false);
            }
        };

        peticion_verPdf();

        // Liberar el recurso cuando el componente se desmonte
        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
        };
    }, [id]); // Dependencia en 'id' para cambiar el documento

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // Cambiar modo de visualización
    const toggleViewMode = () => {
        setViewMode(viewMode === 'page-by-page' ? 'all-pages' : 'page-by-page');
    };

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    if (!mostrar) {
        return <WithLoader isLoading={isLoading}></WithLoader>;
    }

    return (
        <div className='pdfDiv'>
            <div className="controls">
                {/* Botones para cambiar modo de visualización */}
                
                <button onClick={toggleViewMode}>
                    Cambiar a {viewMode === 'page-by-page' ? 'Ver todo' : 'Ver página por página'}
                </button>
                {/* Si estamos en el modo página por página, mostramos las flechas */}
                {viewMode === 'page-by-page' && (
                    <div>
                        <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
                            Anterior
                        </button>
                        <button onClick={goToNextPage} disabled={pageNumber === numPages}>
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
            
            {/* Mostrar la cantidad de páginas solo en modo "all-pages" */}
            {numPages && viewMode === 'page-by-page' && (
                <p className="pageInfo">
                    Página {pageNumber} de {numPages}
                </p>
            )}
            {numPages && viewMode === 'all-pages' && (
                <p className="pageInfo">
                    Total de {numPages} páginas
                </p>
            )}

            {/* Muestra el documento según el modo seleccionado */}
            <Document file={mostrar} onLoadSuccess={onDocumentLoadSuccess}>
                {viewMode === 'page-by-page' ? (
                    <Page
                        key={`page_${pageNumber}`}
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                ) : (
                    Array.from({ length: numPages }, (_, index) => (
                        <div
                            key={`page_${index + 1}`}
                            className={`pageWrapper ${pageNumber === index + 1 ? 'currentPage' : ''}`}
                        >
                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))
                )}
            </Document>
        </div>
    );
}

export default PdfComp;
