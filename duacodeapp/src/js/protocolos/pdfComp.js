import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if (!file) {
        return <p>No hay archivo seleccionado</p>;
    }

    return (
        <div className='pdfDiv'>
            <p>
                Página {pageNumber} de {numPages}
            </p>
            
            <Document file={`http://127.0.0.1:8000${file}`} onLoadSuccess={onDocumentLoadSuccess}>
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
