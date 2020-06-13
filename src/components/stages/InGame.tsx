import React, { FunctionComponent, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import Basket from '../Basket';
import Food from '../Food';
import GameStore, { FoodDetails } from '../../stores/GameStore';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const HealthPointsContainer = styled.div`
    display: flex;
    padding:10px;
    position: absolute;
    top: 0;
    right: 0;
`
const HealthPoint = styled.div`
    margin: 0 5px;
    color: red;
`;

const GamePointsContainer = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
`;

const Container = styled.div`
    overflow: hidden;
`;

const InGame: FunctionComponent = () => {
    const { foods } = GameStore;
    const getRandomFood = useCallback(() => {
        const food = foods[Math.floor(Math.random() * foods.length)];
        return food;
    }, [foods]);

    const basketRef = useRef<HTMLDivElement>(null);
    const [gameFoods, setGameFoods] = useState<FoodDetails[]>([]);

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            setGameFoods([...gameFoods, getRandomFood()]);
        }, 1000);

        return () => {
            clearTimeout(timeoutRef);
        }
    }, [gameFoods, foods, getRandomFood]);

    const healthPointsArray = useMemo(() => Array.from(Array(GameStore.healthPoints)), [GameStore.healthPoints]);

    return (
        <Container>
            <HealthPointsContainer>
                {healthPointsArray.map((_, index) => (
                    <HealthPoint key={index}>❤</HealthPoint>
                ))}
            </HealthPointsContainer>
            <GamePointsContainer>
                {`${GameStore.gamePoints} / ${GameStore.maxGamePoints}`}
            </GamePointsContainer>
            <div>
                {gameFoods.map((foodDetails, index) => (
                    <Food basketRef={basketRef} foodDetails={foodDetails} key={index} />
                ))}
            </div>
            <Basket ref={basketRef} currentCharacter={GameStore.currentCharacter} />
        </Container>
    )
}

export default observer(InGame);