import express, { Request, Response } from 'express';
import { calculateRowSums, calculateRowAverages } from '../algorithms/rowOperations';
import { calculateColumnSums, calculateColumnAverages } from '../algorithms/columnOperations';
import { swapDiagonals } from '../algorithms/diagonalOperations';
import { calculateDeterminant } from '../algorithms/determinant';

const router = express.Router();

// Validation middleware
function validateMatrix(req: Request, res: Response, next: Function) {
    const { matrix } = req.body;

    // Check if matrix exists
    if (!matrix || !Array.isArray(matrix)) {
        return res.status(400).json({
            error: 'Invalid input: matrix must be a 2D array'
        });
    }

    const n = matrix.length;

    // Check minimum size constraint
    if (n < 20) {
        return res.status(400).json({
            error: 'Invalid input: matrix size must be at least 20×20'
        });
    }

    // Check if matrix is square and all rows have same length
    for (let i = 0; i < n; i++) {
        if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
            return res.status(400).json({
                error: 'Invalid input: matrix must be square (N×N)'
            });
        }

        // Check if all elements are numbers
        for (let j = 0; j < n; j++) {
            if (typeof matrix[i][j] !== 'number' || isNaN(matrix[i][j])) {
                return res.status(400).json({
                    error: `Invalid input: all matrix elements must be numbers (found invalid at [${i}][${j}])`
                });
            }
        }
    }

    next();
}

// POST /api/matrix/row-sum
router.post('/row-sum', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        const result = calculateRowSums(matrix);

        res.json({
            operation: 'Row Sum',
            result,
            metadata: {
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during row sum calculation'
        });
    }
});

// POST /api/matrix/column-sum
router.post('/column-sum', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        const result = calculateColumnSums(matrix);

        res.json({
            operation: 'Column Sum',
            result,
            metadata: {
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during column sum calculation'
        });
    }
});

// POST /api/matrix/row-average
router.post('/row-average', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        const result = calculateRowAverages(matrix);

        res.json({
            operation: 'Row Average',
            result,
            metadata: {
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                note: 'Reuses row sum calculation',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during row average calculation'
        });
    }
});

// POST /api/matrix/column-average
router.post('/column-average', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        const result = calculateColumnAverages(matrix);

        res.json({
            operation: 'Column Average',
            result,
            metadata: {
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                note: 'Reuses column sum calculation',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during column average calculation'
        });
    }
});

// POST /api/matrix/swap-diagonals
router.post('/swap-diagonals', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        // Create a deep copy since the operation is in-place
        const matrixCopy = matrix.map((row: number[]) => [...row]);
        const result = swapDiagonals(matrixCopy);

        res.json({
            operation: 'Swap Upper & Lower Diagonal',
            result,
            metadata: {
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                note: 'In-place operation, no auxiliary matrix',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during diagonal swap'
        });
    }
});

// POST /api/matrix/determinant
router.post('/determinant', validateMatrix, (req: Request, res: Response) => {
    try {
        const { matrix } = req.body;
        const result = calculateDeterminant(matrix);

        res.json({
            operation: 'Determinant (Gaussian Elimination)',
            result,
            metadata: {
                timeComplexity: 'O(n³)',
                spaceComplexity: 'O(n²)',
                method: 'Gaussian Elimination with Partial Pivoting',
                matrixSize: matrix.length
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error during determinant calculation'
        });
    }
});

export default router;
