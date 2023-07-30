import React, { useState, useEffect } from 'react';
import api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.Styled';
import Modal from './Modal/Modal';

const IMAGES_PER_PAGE = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await api.fetchImages(query, currentPage, IMAGES_PER_PAGE);
        
        if (hits.length === 0) {
          alert("No results found.");
          setIsLoading(false);
          return; 
        }
        
        setImages((prevImages) => [...prevImages, ...hits]);
        
        setHasLoadedAll(currentPage >= Math.ceil(totalHits / IMAGES_PER_PAGE));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (query !== '' || currentPage !== 1) {
      fetchData();
    }
  }, [query, currentPage]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const openModal = (imageUrl, imageAlt) => {
    setModalData ({ largeImageURL: imageUrl, alt: imageAlt });
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setModalData({});
  };
  
  const showButton = !hasLoadedAll && !isLoading && images.length > 0;
  
  return (
    <Container>
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {error && <p>Oops... Something went wrong.</p>}
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {showButton && <Button onClick={handleLoadMore}>Load More</Button>}
      {isShowModal && <Modal modalData={modalData} onClose={closeModal} />}
      <GlobalStyle />
    </Container>
  );
};