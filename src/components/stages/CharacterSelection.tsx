import React, { FunctionComponent, useCallback, useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide, CarouselContext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { observer } from 'mobx-react-lite';
import GameStore, { Character, FoodDetails } from '../../stores/GameStore';

const ItemContainer = styled.div`
    span {
        color: red;
        font-weight: 600;
    }
    img {
        max-width: 87px;
    }
`;

const ItemTitle = styled.div`
    font-size: 30px;
    color: #000;
    margin: 20px 0 70px;
`;

const ItemDescription = styled.div`
    font-size: 26px;
    line-height: 30px;
    color: #000;
    margin-bottom: 20px;
`;

const FoodsContainer = styled.div`
    margin-bottom: 40px;
    img {
        max-width: 50px;
    }
`;

const SelectButton = styled.button`
    display:inline-block;
    border: 0;
    margin: 0 auto;
    padding: 15px 40px;

    background-color: rgb(173, 65, 65);
    cursor: pointer;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    border-radius: 18px;
    outline: none;
    margin-top: 20px;
    letter-spacing: 2px;
`;

const allergyMap: any = {
    'lactose': 'Lactose',
    'glutten': 'Glutten',
    'peanuts': 'Peanuts'
}

const CharacterItem: FunctionComponent<{ item: Character; foods: FoodDetails[]; }> = ({ foods, item: { name, age, allergies, imagePrefix, customSelectImageWidth } }) => {
    const allergyFoods = useMemo(() => foods.filter(f => allergies.includes(f.allergy)), [allergies, foods]);
    return (
        <ItemContainer>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>
                {`
                    Age: ${age}
                `} <br /><br />
                ALLERGIES:
            </ItemDescription>
            <FoodsContainer>
                {allergyFoods.map(a => (
                    <img src={require(`../../resources/${a.imageUrl}`)} alt='' />
                ))}
            </FoodsContainer>
            <img alt='' src={require(`../../resources/${imagePrefix}-select.png`)} style={{ maxWidth: customSelectImageWidth }} />
        </ItemContainer>
    )
}

const Container = styled.div`
    height: 400px;
`;

const CarouselSlider: FunctionComponent<{ items: Character[]; onChange: (index: number) => void; foods: FoodDetails[] }> = ({ items, onChange, foods }) => {
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
                    <CharacterItem item={char} foods={foods} />
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
            <SelectButton onClick={handleSelect}>Select</SelectButton>
            <CarouselProvider
                infinite={true}
                naturalSlideHeight={400}
                naturalSlideWidth={150}
                totalSlides={characters.length}>
                <CarouselSlider items={characters} onChange={handleChange} foods={GameStore.foods} />
            </CarouselProvider>
        </Container>
    )
}


export default observer(CharacterSelection);