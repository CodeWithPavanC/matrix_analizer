/**
 * Determinant Calculation using Gaussian Elimination
 * Time Complexity: O(n³) - nested loops for row reduction
 * Space Complexity: O(n²) - copy matrix to avoid modifying original
 * 
 * Algorithm (Gaussian Elimination with Partial Pivoting):
 * 1. Create a copy of the matrix to preserve the original
 * 2. Forward elimination to create upper triangular matrix:
 *    - For each column i from 0 to n-1:
 *      a. Find the row with maximum absolute value in column i (partial pivoting)
 *      b. Swap rows if necessary (track sign change for determinant)
 *      c. If pivot element is zero, matrix is singular, determinant is 0
 *      d. Eliminate all elements below the pivot
 * 3. Calculate determinant as sign × product of diagonal elements
 * 
 * Why Gaussian Elimination over Laplace Expansion?
 * - Gaussian Elimination: O(n³) - efficient and scalable
 * - Laplace Expansion (recursive): O(n!) - exponentially slow, impractical for n ≥ 20
 * - Numerical stability with partial pivoting prevents division by small numbers
 */
export function calculateDeterminant(matrix: number[][]): number {
    const n = matrix.length;

    // Create a deep copy to avoid modifying the original matrix
    const mat: number[][] = matrix.map(row => [...row]);

    let sign = 1;  // Track sign changes from row swaps

    // Gaussian elimination with partial pivoting
    for (let i = 0; i < n; i++) {
        // Find pivot (row with largest absolute value in column i)
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) {
                maxRow = k;
            }
        }

        // Swap rows if necessary
        if (maxRow !== i) {
            [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
            sign *= -1;  // Each row swap negates the determinant
        }

        // Check if matrix is singular (determinant = 0)
        if (Math.abs(mat[i][i]) < 1e-10) {
            return 0;
        }

        // Eliminate all elements below the pivot in column i
        for (let k = i + 1; k < n; k++) {
            const factor = mat[k][i] / mat[i][i];

            // Subtract factor * row[i] from row[k]
            for (let j = i; j < n; j++) {
                mat[k][j] -= factor * mat[i][j];
            }
        }
    }

    // Calculate determinant as product of diagonal elements
    // (upper triangular matrix property)
    let det = sign;
    for (let i = 0; i < n; i++) {
        det *= mat[i][i];
    }

    return det;
}
