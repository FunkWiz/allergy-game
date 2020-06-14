import React, { FunctionComponent, useCallback, useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide, CarouselContext, ButtonNext, ButtonBack } from 'pure-react-carousel';
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
    margin: 20px 0 20px;
`;

const ItemDescription = styled.div`
    font-size: 26px;
    line-height: 20px;
    color: #000;
    margin-bottom: 20px;
`;

const FoodsContainer = styled.div`
    margin-bottom: 20px;
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

const CharacterItem: FunctionComponent<{ item: Character; foods: FoodDetails[]; }> = ({ foods, item: { name, age, allergies, imagePrefix, customSelectImageWidth } }) => {
    const allergyFoods = useMemo(() => foods.filter(f => allergies.includes(f.allergy)), [allergies, foods]);
    return (
        <ItemContainer>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>
                {`
                    Age: ${age}
                `} <br /><br />
                <span>ALLERGIES:</span>
            </ItemDescription>
            <FoodsContainer>
                {allergyFoods.map((a, index) => (
                    <img src={require(`../../resources/${a.imageUrl}`)} key={index} alt='' />
                ))}
            </FoodsContainer>
            <img alt='' src={require(`../../resources/${imagePrefix}-select.png`)} style={{ maxWidth: customSelectImageWidth }} />
        </ItemContainer>
    )
}

const Container = styled.div`
    height: 400px;

    .btn-next, .btn-back {
        position: absolute;
        top: 120px;
        bottom :0;
        margin: auto 10px;

        display:inline-block;
        border: 0;
        padding: 5px;

        background-color: rgb(173, 65, 65);
        cursor: pointer;
        color: #fff;
        font-size: 28px;
        font-weight: 600;
        border-radius: 18px;
        outline: none;
        letter-spacing: 2px;
        height:70px;
        z-index:100;
    }

    .btn-next {
        right: 15px;
    }
    
    .btn-back {
        left: 15px;
    }
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
        GameStore.setStage('countdown');
    }, []);

    return (
        <Container>
            <SelectButton onClick={handleSelect}>Select</SelectButton>
            <CarouselProvider
                infinite={true}
                naturalSlideHeight={400}
                naturalSlideWidth={150}
                totalSlides={characters.length}>
                <>
                    <ButtonBack className="btn-back">{`<`}</ButtonBack>
                    <ButtonNext className='btn-next'>></ButtonNext>
                    <CarouselSlider items={characters} onChange={handleChange} foods={GameStore.foods} />
                </>
            </CarouselProvider>
        </Container>
    )
}


export default observer(CharacterSelection);