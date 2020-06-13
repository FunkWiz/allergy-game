import React, { FunctionComponent, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import Basket from '../Basket';
import Food from '../Food';
import GameStore, { FoodDetails } from '../../stores/GameStore';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const HealthPointsContainer = styled.div`
    display: flex;
    padding:10px 10px 0 0;
    position: absolute;
    top: 0;
    right: 0;
`
const HealthPoint = styled.div`
    margin: 0 5px;
    color: red;
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
        <div>
            <HealthPointsContainer>
                {healthPointsArray.map((_, index) => (
                    <HealthPoint key={index}>❤</HealthPoint>
                ))}
            </HealthPointsContainer>
            <div>
                {gameFoods.map((foodDetails, index) => (
                    <Food basketRef={basketRef} foodDetails={foodDetails} key={index} />
                ))}
            </div>
            <Basket ref={basketRef} />
        </div>
    )
}

export default observer(InGame);