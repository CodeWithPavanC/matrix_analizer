/**
 * Column Sum Algorithm
 * Time Complexity: O(n²) - iterate through n columns, accessing n rows per column
 * Space Complexity: O(n) - output array of n column sums
 * 
 * Algorithm:
 * 1. Initialize result array of size n
 * 2. For each column j (0 to n-1):
 *    - For each row i (0 to n-1):
 *      - Add matrix[i][j] to colSum[j]
 * 3. Return result array
 */
export function calculateColumnSums(matrix: number[][]): number[] {
    const n = matrix.length;
    const colSums = new Array(n).fill(0);

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            colSums[j] += matrix[i][j];
        }
    }

    return colSums;
}

/**
 * Column Average Algorithm
 * Time Complexity: O(n²) + O(n) = O(n²) - reuses column sums, then divides by n
 * Space Complexity: O(n) - output array of n column averages
 * 
 * Algorithm:
 * 1. Reuse calculateColumnSums() to get column sums
 * 2. Divide each sum by n to get average
 * 3. Return result array
 */
export function calculateColumnAverages(matrix: number[][]): number[] {
    const n = matrix.length;
    const colSums = calculateColumnSums(matrix);  // Reuse column sums - no recomputation!

    return colSums.map(sum => sum / n);
}
