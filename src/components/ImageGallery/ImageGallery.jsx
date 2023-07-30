import React from 'react'; 
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
    return (
        <StyledImageGallery>
            {images.map((image) => (
                <ImageGalleryItem
                    key={image.id}
                    item={image}
                    openModal={openModal}
                />
            ))}
        </StyledImageGallery>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGallery;