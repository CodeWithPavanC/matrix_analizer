/**
 * Swap Upper & Lower Diagonal (In-Place) Algorithm
 * Time Complexity: O(n²/2) = O(n²) - only process upper triangle
 * Space Complexity: O(1) - in-place swap, no auxiliary matrix
 * 
 * Conditions:
 * - Upper diagonal: i < j
 * - Lower diagonal: i > j
 * - Main diagonal (i == j): unchanged
 * 
 * Algorithm:
 * 1. For each row i from 0 to n-1:
 *    - For each column j from i+1 to n-1 (only upper triangle):
 *      - Swap matrix[i][j] (upper) with matrix[j][i] (lower)
 * 2. Return modified matrix
 * 
 * Note: This effectively transposes the matrix while preserving the main diagonal
 */
export function swapDiagonals(matrix: number[][]): number[][] {
    const n = matrix.length;

    // Process only the upper triangle (i < j)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Swap upper diagonal element with lower diagonal element
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    return matrix;
}
