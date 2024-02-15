import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TicTacToe = ({ closeModal }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const winnerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (player === 'O') {
      // If it's the AI's turn, make a random move after a delay
      const timeout = setTimeout(makeAiMove, 1000);
      return () => clearTimeout(timeout);
    }
  }, [player]);

  const handleSquarePress = (index) => {
    if (board[index] || winner || player === 'O') return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    checkWinner(newBoard);
    setPlayer('O');
  };

  const makeAiMove = () => {
    const emptySquares = board.reduce((acc, value, index) => {
      if (!value) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptySquares.length === 0 || winner) return;

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const aiMove = emptySquares[randomIndex];

    const newBoard = [...board];
    newBoard[aiMove] = 'O';
    setBoard(newBoard);

    checkWinner(newBoard);
    setPlayer('X');
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        Animated.timing(winnerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
    winnerAnimation.setValue(0);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handleSquarePress(index)}
    >
      <Animated.Text
        style={[
          styles.squareText,
          {
            opacity: board[index] ? 1 : winnerAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        {board[index]}
      </Animated.Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={closeModal}
      >
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.turnIndicator}>
        <Text style={styles.turnText}>
          {winner ? 'Game Over' : `Turn: ${player}`}
        </Text>
      </View>
      <View style={styles.board}>
        {board.map((square, index) => (
          <View key={index} style={styles.squareContainer}>
            {renderSquare(index)}
          </View>
        ))}
      </View>
      {winner && (
        <View style={styles.result}>
          {winner === 'draw' ? (
            <Text style={styles.resultText}>It's a draw!</Text>
          ) : (
            <Text style={styles.resultText}>{winner} wins!</Text>
          )}
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <MaterialIcons name="replay" size={24} color="white" />
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  turnIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  turnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  squareContainer: {
    width: '33.33%',
    aspectRatio: 1,
  },
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'teal',
    backgroundColor: '#000',
  },
  squareText: {
    fontSize: 50,
    color: '#FFF',
  },
  result: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
