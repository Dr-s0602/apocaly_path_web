import React, { useState, useEffect } from 'react';

const Map = () => {
    const size = 16;
    const specialCount = { green: 2, yellow: 1 };

    const getRandomPosition = () => {
        let randomX = Math.floor(Math.random() * size);
        let randomY = Math.floor(Math.random() * size);
        return { x: randomX, y: randomY };
    };

    const [map, setMap] = useState(Array(size).fill(Array(size).fill('hidden')));
    const [playerPos, setPlayerPos] = useState(getRandomPosition());
    const [specialPositions, setSpecialPositions] = useState({ green: [], yellow: [] });
    const [valuesMap, setValuesMap] = useState(Array(size).fill(Array(size).fill(0)));

    useEffect(() => {
        let newSpecialPositions = { green: [], yellow: [] };
        let newValuesMap = [...valuesMap];
        let positionsSet = new Set([`${playerPos.x}-${playerPos.y}`]);

        // 특수 위치와 값 지정
        const addSpecialPositionsAndValues = (color, count) => {
            while (newSpecialPositions[color].length < count) {
                let newPos = getRandomPosition();
                let posKey = `${newPos.x}-${newPos.y}`;
                if (!positionsSet.has(posKey)) {
                    positionsSet.add(posKey);
                    newSpecialPositions[color].push(newPos);
                }
            }
        };

        // 나머지 칸에 가중치를 준 랜덤한 값 할당
        const assignRandomValues = () => {
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    let posKey = `${x}-${y}`;
                    if (!positionsSet.has(posKey)) {
                        let rand = Math.random(); // 0에서 1 사이의 랜덤한 값
                        let value = 1; // 기본값
                        if (rand < 0.25) value = 1;
                        else if (rand < 0.45) value = 2;
                        else if (rand < 0.50) value = 3;
                        else if (rand < 0.60) value = 4;
                        else if (rand < 0.70) value = 5;
                        else if (rand < 0.80) value = 6;
                        else if (rand < 0.90) value = 7;
                        else value = 8;
                        newValuesMap[y][x] = value;
                    }
                }
            }
        };

        addSpecialPositionsAndValues('green', specialCount.green);
        addSpecialPositionsAndValues('yellow', specialCount.yellow);
        assignRandomValues();

        setSpecialPositions(newSpecialPositions);
        setValuesMap(newValuesMap);
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    // 맵과 특수 위치 업데이트
    useEffect(() => {
        const newMap = map.map((row, y) =>
            row.map((col, x) => {
                let isSpecial = '';
                Object.keys(specialPositions).forEach(color => {
                    specialPositions[color].forEach(pos => {
                        if (pos.x === x && pos.y === y) {
                            isSpecial = `special-${color}`;
                        }
                    });
                });

                if (x === playerPos.x && y === playerPos.y) {
                    // 여기에서 각 값에 따른 메시지를 콘솔에 출력합니다.
                    let message = ''; // 이동한 칸에 따른 메시지를 저장할 변수
                    switch (valuesMap[y][x]) {
                        case 1:
                            message = '이동';
                            break;
                        case 2:
                            message = '일반 이벤트';
                            break;
                        case 3:
                            message = '엘리트 적군';
                            break;
                        case 4:
                            message = '보물 발견';
                            break;
                        case 5:
                            message = '함정 발동';
                            break;
                        case 6:
                            message = '쉬는 시간';
                            break;
                        case 7:
                            message = '비밀 통로 발견';
                            break;
                        case 8:
                            message = '보스 적군';
                            break;
                        default:
                            message = '알 수 없는 영역';
                            break;
                    }
                    console.log(`You moved to (${x}, ${y}) with value: ${valuesMap[y][x]}, Event: ${message}`);
                    return isSpecial || 'current';
                }

                if (col === 'revealed') {
                    return 'revealed';
                }
                if (Math.abs(x - playerPos.x) + Math.abs(y - playerPos.y) === 1) {
                    return 'adjacent';
                }
                return 'hidden';
            })
        );
        setMap(newMap);
    }, [playerPos, specialPositions, valuesMap]); // 의존성 배열에 valuesMap 추가

    const handleSquareClick = (x, y) => {
        if (map[y][x] === 'adjacent' || map[y][x] === 'revealed' || map[y][x].startsWith('special')) {
            const newMap = map.map((row, rowIndex) =>
                row.map((col, colIndex) => {
                    if (colIndex === playerPos.x && rowIndex === playerPos.y) {
                        return 'revealed';
                    }
                    return col;
                })
            );
            setMap(newMap);
            setPlayerPos({ x, y });
        }
    };

    return (
        <div className="map_content" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {map.map((row, y) => (
                row.map((status, x) => (
                    <div
                        key={`${x}-${y}`}
                        className={`square ${status}`}
                        onClick={() => handleSquareClick(x, y)}
                    />
                ))
            ))}
        </div>
    );
};

export default Map;
