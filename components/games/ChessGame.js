import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const SQUARE_SIZE = 45;
const ANIMATION_DURATION = 300;

const ChessPiece = ({ piece, animation }) => {
  return (
    <Animated.Text style={[styles.piece, animation]}>{piece}</Animated.Text>
  );
};

const ChessGame = ({ closeModal }) => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [pieceAnimations, setPieceAnimations] = useState(
    initialBoard.map((row) => row.map(() => new Animated.ValueXY()))
  );
  const [highlightedSquares, setHighlightedSquares] = useState([]);

  const handleSquarePress = (row, col) => {
    const piece = board[row][col];
    if (!piece) return;

    if (
      selectedPiece &&
      selectedPiece.row === row &&
      selectedPiece.col === col
    ) {
      setSelectedPiece(null);
      setHighlightedSquares([]);
      return;
    }

    if (!selectedPiece) {
      setSelectedPiece({ piece, row, col });
      const validMoves = calculateValidMoves(row, col, piece);
      setHighlightedSquares(validMoves);
      return;
    }

    const isValidMove = validateMove(
      [selectedPiece.row, selectedPiece.col],
      [row, col],
      selectedPiece.piece
    );

    if (isValidMove) {
      animatePieceMovement(
        [selectedPiece.row, selectedPiece.col],
        [row, col],
        selectedPiece.piece
      );
      setSelectedPiece(null);
      setHighlightedSquares([]);
    } else {
      console.log("Invalid move");
    }
  };

  const calculateValidMoves = (row, col, piece) => {
    const validMoves = [];

    // Helper function to check if a square is occupied by a piece of the same color
    const isOccupiedBySameColor = (targetRow, targetCol) => {
      const targetPiece = board[targetRow][targetCol];
      return (
        targetPiece &&
        targetPiece.charCodeAt(0) >= 65 &&
        targetPiece.charCodeAt(0) <= 90
      );
    };

    switch (piece) {
      case "♔": // King
        // King can move to any neighboring square that is not occupied by a piece of the same color
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (
              i >= 0 &&
              i < 8 &&
              j >= 0 &&
              j < 8 &&
              (i !== row || j !== col) &&
              !isOccupiedBySameColor(i, j)
            ) {
              validMoves.push([i, j]);
            }
          }
        }
        break;
      case "♖": // Rook
        // Rook can move horizontally and vertically until it reaches the edge of the board or another piece
        for (let i = row - 1; i >= 0; i--) {
          if (!isOccupiedBySameColor(i, col)) {
            validMoves.push([i, col]);
            if (board[i][col]) break;
          } else {
            break;
          }
        }
        for (let i = row + 1; i < 8; i++) {
          if (!isOccupiedBySameColor(i, col)) {
            validMoves.push([i, col]);
            if (board[i][col]) break;
          } else {
            break;
          }
        }
        for (let j = col - 1; j >= 0; j--) {
          if (!isOccupiedBySameColor(row, j)) {
            validMoves.push([row, j]);
            if (board[row][j]) break;
          } else {
            break;
          }
        }
        for (let j = col + 1; j < 8; j++) {
          if (!isOccupiedBySameColor(row, j)) {
            validMoves.push([row, j]);
            if (board[row][j]) break;
          } else {
            break;
          }
        }
        break;
      case "♗": // Bishop
        // Bishop can move diagonally until it reaches the edge of the board or another piece
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
          if (!isOccupiedBySameColor(i, j)) {
            validMoves.push([i, j]);
            if (board[i][j]) break;
          } else {
            break;
          }
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
          if (!isOccupiedBySameColor(i, j)) {
            validMoves.push([i, j]);
            if (board[i][j]) break;
          } else {
            break;
          }
        }
        for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
          if (!isOccupiedBySameColor(i, j)) {
            validMoves.push([i, j]);
            if (board[i][j]) break;
          } else {
            break;
          }
        }
        for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
          if (!isOccupiedBySameColor(i, j)) {
            validMoves.push([i, j]);
            if (board[i][j]) break;
          } else {
            break;
          }
        }
        break;
      case "♕": // Queen
        // Queen can move like a Rook or a Bishop
        validMoves.push(...calculateValidMoves(row, col, "♖")); // Rook moves
        validMoves.push(...calculateValidMoves(row, col, "♗")); // Bishop moves
        break;
      case "♘": // Knight
        // Knight moves in an L-shape pattern (2 squares in one direction and 1 square perpendicular to it)
        const knightMoves = [
          [row - 2, col - 1],
          [row - 2, col + 1],
          [row + 2, col - 1],
          [row + 2, col + 1],
          [row - 1, col - 2],
          [row - 1, col + 2],
          [row + 1, col - 2],
          [row + 1, col + 2],
        ];
        knightMoves.forEach(([i, j]) => {
          if (
            i >= 0 &&
            i < 8 &&
            j >= 0 &&
            j < 8 &&
            !isOccupiedBySameColor(i, j)
          ) {
            validMoves.push([i, j]);
          }
        });
        break;
      case "♙": // Pawn
        // Pawn moves one square straight ahead if the square is empty
        const direction = piece.charCodeAt(0) >= 97 ? 1 : -1; // Check if it's a white or black pawn
        if (board[row + direction][col] === "") {
          validMoves.push([row + direction, col]);
        }
        // Pawn can move two squares forward on its first move if the squares in front are empty
        if ((row === 1 && direction === 1) || (row === 6 && direction === -1)) {
          if (
            board[row + direction][col] === "" &&
            board[row + 2 * direction][col] === ""
          ) {
            validMoves.push([row + 2 * direction, col]);
          }
        }
        // Pawn can capture diagonally
        if (col > 0 && isOccupiedBySameColor(row + direction, col - 1)) {
          validMoves.push([row + direction, col - 1]);
        }
        if (col < 7 && isOccupiedBySameColor(row + direction, col + 1)) {
          validMoves.push([row + direction, col + 1]);
        }
        break;
      default:
        break;
    }

    return validMoves;
  };

  const validateMove = (start, end, piece) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    // Placeholder for move validation logic
    return true; // Placeholder
  };

  const animatePieceMovement = (start, end, piece) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const startX = startCol * SQUARE_SIZE;
    const startY = startRow * SQUARE_SIZE;
    const endX = endCol * SQUARE_SIZE;
    const endY = endRow * SQUARE_SIZE;

    const animation = pieceAnimations[startRow][startCol];

    Animated.timing(animation, {
      toValue: { x: endX - startX, y: endY - startY },
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(() => {
      updateBoardState(start, end, piece);
    });
  };

  const updateBoardState = (start, end, piece) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    const newBoard = board.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === startRow && colIndex === startCol) {
          return ""; // Clear the start position
        } else if (rowIndex === endRow && colIndex === endCol) {
          return piece; // Place the piece at the end position
        } else {
          return cell; // Keep other cells unchanged
        }
      });
    });

    setBoard(newBoard);
  };

  const renderGameInstructions = () => {
    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to Play:</Text>
        <Text style={styles.instructionsText}>
          1. Tap on a piece to select it.
        </Text>
        <Text style={styles.instructionsText}>
          2. Tap on a valid square to move the selected piece.
        </Text>
        <Text style={styles.instructionsText}>3. Enjoy playing chess!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderGameInstructions()}
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((piece, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.square,
                  (rowIndex + colIndex) % 2 === 0 ? styles.light : styles.dark,
                  highlightedSquares.some(
                    (square) => square[0] === rowIndex && square[1] === colIndex
                  ) && styles.highlighted,
                ]}
                onPress={() => handleSquarePress(rowIndex, colIndex)}
              >
                <View style={styles.pieceContainer}>
                  {piece ? (
                    <ChessPiece
                      piece={piece}
                      animation={{
                        transform: [
                          { translateX: pieceAnimations[rowIndex][colIndex].x },
                          { translateY: pieceAnimations[rowIndex][colIndex].y },
                        ],
                      }}
                    />
                  ) : (
                    <View style={styles.emptySquare} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
    color: "#000",
  },
  instructionsText: {
    fontSize: 15,
    marginBottom: 5,
    color: "#000",
  },
  board: {
    borderWidth: 1,
    borderColor: "#FFF",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  light: {
    backgroundColor: "#f0d9b5",
  },
  dark: {
    backgroundColor: "#b58863",
  },
  highlighted: {
    backgroundColor: "yellow", // Change color to indicate highlighted squares
  },
  pieceContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  piece: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  emptySquare: {
    width: "80%",
    height: "80%",
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ChessGame;
