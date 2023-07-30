import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (query.trim() === "") {
            return alert("Please enter a valid query.");
        }
        onSubmit(query);
    };

    return (
        <Header>
            <Form onSubmit={handleSubmit}>
                <Button type="submit">
                    <HiMagnifyingGlass />
                    <ButtonLabel>Search</ButtonLabel>
                </Button>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleChange}
                />
            </Form>
        </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;