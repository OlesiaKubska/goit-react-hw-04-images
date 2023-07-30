import React from 'react';
import { DotLoader } from 'react-spinners';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
    return (
        <LoaderContainer>
            <DotLoader
                color="#00BFFF"
                size={80}
            />
        </LoaderContainer>
    );
};

export default Loader;