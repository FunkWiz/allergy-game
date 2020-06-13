import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide, CarouselContext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { observer } from 'mobx-react-lite';
import GameStore, { Character } from '../../stores/GameStore';

const ItemContainer = styled.div`
    img {
        max-width: 107px;
    }
`;

const ItemTitle = styled.div`
    font-size: 30px;
    color: #000;
    margin: 70px 0;
`;

const CharacterItem: FunctionComponent<{ item: Character }> = ({ item: { name, imagePrefix, customSelectImageWidth } }) => {

    return (
        <ItemContainer>
            <ItemTitle>{name}</ItemTitle>
            <img alt='' src={require(`../../resources/${imagePrefix}-select.png`)} style={{ maxWidth: customSelectImageWidth }} />
        </ItemContainer>
    )
}

const Container = styled.div`
    height: 400px;
`;

const CarouselSlider: FunctionComponent<{ items: Character[]; onChange: (index: number) => void }> = ({ items, onChange }) => {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);

    useEffect(() => {
        onChange(currentSlide);
    }, [currentSlide, onChange]);

    return (
        <Slider>
            {items.map((char, idx) => (
                <Slide index={idx} key={idx}>
                    <CharacterItem item={char} />
                </Slide>
            ))}
        </Slider>

    )
}

const CharacterSelection: FunctionComponent = () => {
    const { characters } = GameStore;
    const handleChange = useCallback((index: number) => {
        GameStore.setCurrentCharacter(characters[index].id);
    }, [characters]);
    const handleSelect = useCallback(() => {
        GameStore.setStage('in-game');
    }, []);

    return (
        <Container>
            <button onClick={handleSelect}>Select</button>
            <CarouselProvider
                infinite={true}
                naturalSlideHeight={400}
                naturalSlideWidth={150}
                totalSlides={characters.length}>
                <CarouselSlider items={characters} onChange={handleChange} />
            </CarouselProvider>
        </Container>
    )
}


export default observer(CharacterSelection);