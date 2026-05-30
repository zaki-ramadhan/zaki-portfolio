/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify-icon/react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MediaViewer = ({ isOpen, onClose, fileUrl, title, fileType }) => {
    const { t } = useTranslation();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [containerWidth, setContainerWidth] = useState(0);
    const [fileBlob, setFileBlob] = useState(null);
    const [useFallback, setUseFallback] = useState(false);
    const containerRef = useRef(null);

    const isImage = fileType === 'image' || (fileUrl && fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i));
    const normalizedFileUrl = fileUrl ? (fileUrl.startsWith('http:') ? fileUrl.replace('http:', 'https:') : fileUrl) : '';

    // Handle PDF Blob fetching & safety check
    useEffect(() => {
        setUseFallback(false); 
        if (isOpen && !isImage && normalizedFileUrl) {
            fetch(normalizedFileUrl)
                .then(res => {
                    if (!res.ok) {
                        if (res.status === 401 || res.status === 403) setUseFallback(true);
                        throw new Error(`Fetch failed with status: ${res.status}`);
                    }
                    return res.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    setFileBlob(url);
                    setUseFallback(false);
                })
                .catch(err => {
                    console.error("Blob fetch error:", err);
                    setFileBlob(normalizedFileUrl);
                    if (normalizedFileUrl.includes('cloudinary.com')) setUseFallback(true);
                });
        }
        return () => {
            if (fileBlob && typeof fileBlob === 'string' && fileBlob.startsWith('blob:')) {
                URL.revokeObjectURL(fileBlob);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, normalizedFileUrl, isImage]);

    // Handle responsiveness
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const availableWidth = containerRef.current.offsetWidth - 32;
                setContainerWidth(Math.max(availableWidth, 280)); 
            }
        };

        if (isOpen) {
            const timer = setTimeout(updateWidth, 100);
            window.addEventListener('resize', updateWidth);
            document.body.style.overflow = 'hidden';
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', updateWidth);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setUseFallback(false);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            {/* Styles for custom scrollbar */}
            <style>
                {`
                .viewer-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .viewer-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .viewer-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .viewer-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--additional);
                }
                `}
            </style>

            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-stone-950/95 backdrop-blur-md" 
                onClick={onClose}
            />

            {/* Content Container */}
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center z-10 pointer-events-none">
                
                {/* Header Controls */}
                <div className="w-full mb-6 flex items-center justify-between pointer-events-auto bg-stone-900/80 backdrop-blur-2xl border border-white/10 p-4 rounded-[28px] shadow-2xl">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-10 h-10 rounded-xl bg-additional/20 flex items-center justify-center text-additional shadow-inner">
                            <Icon icon={isImage ? "solar:gallery-bold" : "solar:file-text-bold"} width="22" />
                        </div>
                        <h4 className="text-white font-Archivo font-bold text-sm md:text-lg truncate max-w-[150px] md:max-w-md">
                            {title}
                        </h4>
                    </div>

                    <div className="flex items-center gap-3">
                        {!isImage && !useFallback && numPages > 1 && (
                            <div className="flex items-center gap-2 bg-stone-950/60 rounded-2xl p-1.5 mr-2 border border-white/5">
                                <button
                                    disabled={pageNumber <= 1}
                                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 disabled:opacity-30 transition-all text-white active:scale-95"
                                >
                                    <Icon icon="solar:alt-arrow-left-linear" width="22" />
                                </button>
                                <span className="text-sm md:text-base font-Archivo font-bold text-stone-200 px-3 min-w-[80px] text-center">
                                    {pageNumber} <span className="text-stone-500 mx-1">/</span> {numPages}
                                </span>
                                <button
                                    disabled={pageNumber >= numPages}
                                    onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 disabled:opacity-30 transition-all text-white active:scale-95"
                                >
                                    <Icon icon="solar:alt-arrow-right-linear" width="22" />
                                </button>
                            </div>
                        )}
                        
                        <a 
                            href={normalizedFileUrl} 
                            download 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-additional hover:text-stone-900 transition-all text-stone-400 active:scale-95"
                        >
                            <Icon icon="solar:download-minimalistic-bold" width="24" />
                        </a>
                        
                        <button 
                            onClick={onClose}
                            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-red-500 transition-all text-white active:scale-95"
                        >
                            <Icon icon="solar:close-circle-bold" width="26" />
                        </button>
                    </div>
                </div>

                {/* Main Viewport */}
                <div 
                    ref={containerRef}
                    className="flex-1 w-full overflow-auto pointer-events-auto viewer-scrollbar flex flex-col items-center justify-start py-4 px-4 shadow-inner"
                >
                    <div className="relative flex flex-col items-center w-full">
                        {isImage ? (
                            <div className="relative p-1 bg-white/5 rounded-[32px] shadow-2xl border border-white/10 overflow-hidden">
                                <img 
                                    src={normalizedFileUrl} 
                                    alt={title} 
                                    className="max-w-full max-h-[75vh] object-contain rounded-[28px] shadow-2xl"
                                />
                            </div>
                        ) : useFallback ? (
                            <div className="w-full h-[75vh] rounded-[32px] overflow-hidden bg-stone-900 shadow-2xl border border-white/10 p-1">
                                <iframe
                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(normalizedFileUrl)}&embedded=true`}
                                    className="w-full h-full border-none rounded-[28px]"
                                    title="PDF Fallback Viewer"
                                />
                            </div>
                        ) : (
                            <div className="pdf-container relative shadow-2xl bg-white/5 p-1 rounded-[32px] border border-white/10 overflow-hidden">
                                <Document
                                    file={fileBlob || normalizedFileUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={() => setUseFallback(true)}
                                    loading={
                                        <div className="flex flex-col items-center justify-center py-24 text-stone-400 gap-5">
                                            <div className="w-12 h-12 border-4 border-additional/20 border-t-additional rounded-full animate-spin"></div>
                                            <span className="text-xs font-bold font-Archivo uppercase tracking-[0.2em]">{t("mediaViewer.loading")}</span>
                                        </div>
                                    }
                                    error={
                                        <div className="flex flex-col items-center justify-center py-20 text-red-400 gap-6 px-10 text-center pointer-events-auto">
                                            <Icon icon="solar:danger-broken" width="56" />
                                            <div className="space-y-1">
                                                <span className="text-base font-bold block">{t("mediaViewer.errorTitle")}</span>
                                                <p className="text-sm text-stone-500 max-w-xs mx-auto">{t("mediaViewer.errorDesc")}</p>
                                            </div>
                                            <button 
                                                onClick={() => setUseFallback(true)}
                                                className="px-8 py-4 rounded-2xl bg-additional/10 border border-additional/20 text-additional hover:bg-additional hover:text-stone-950 transition-all font-bold text-sm flex items-center gap-3 shadow-lg active:scale-95"
                                            >
                                                <Icon icon="solar:shield-warning-bold" width="20" />
                                                Use Alternative Viewer
                                            </button>
                                        </div>
                                    }
                                >
                                    <Page 
                                        pageNumber={pageNumber} 
                                        width={containerWidth}
                                        className="max-w-full rounded-2xl overflow-hidden shadow-2xl"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </Document>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaViewer;
