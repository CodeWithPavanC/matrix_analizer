/**
 * Row Sum Algorithm
 * Time Complexity: O(n²) - iterate through n rows, each with n elements
 * Space Complexity: O(n) - output array of n row sums
 * 
 * Algorithm:
 * 1. Initialize result array of size n
 * 2. For each row i (0 to n-1):
 *    - For each column j (0 to n-1):
 *      - Add matrix[i][j] to rowSum[i]
 * 3. Return result array
 */
export function calculateRowSums(matrix: number[][]): number[] {
    const n = matrix.length;
    const rowSums = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rowSums[i] += matrix[i][j];
        }
    }

    return rowSums;
}

/**
 * Row Average Algorithm
 * Time Complexity: O(n²) + O(n) = O(n²) - reuses row sums, then divides by n
 * Space Complexity: O(n) - output array of n row averages
 * 
 * Algorithm:
 * 1. Reuse calculateRowSums() to get row sums
 * 2. Divide each sum by n to get average
 * 3. Return result array
 */
export function calculateRowAverages(matrix: number[][]): number[] {
    const n = matrix.length;
    const rowSums = calculateRowSums(matrix);  // Reuse row sums - no recomputation!

    return rowSums.map(sum => sum / n);
}
