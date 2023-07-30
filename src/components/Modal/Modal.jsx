import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalData, onClose }) => {
    const { largeImageURL, alt } = modalData;

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
    
        const handleClickOutside = (event) => {
            if (!modalContainerRef.current.contains(event.target)) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const modalContainerRef = useRef(null);
    
    return createPortal(
        <Overlay>
            <ModalContainer ref={modalContainerRef}>
                <img src={largeImageURL} alt={alt} />
            </ModalContainer>
        </Overlay>,
        modalRoot
    );
};

Modal.propTypes = {
    modalData: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        alt: PropTypes.string,
    }), 
    onClose: PropTypes.func.isRequired,
};

export default Modal;