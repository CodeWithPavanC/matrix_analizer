export interface Matrix {
    size: number;
    data: number[][];
}

export interface MatrixOperationResult {
    operation: string;
    result: number[] | number[][];
    metadata: {
        timeComplexity: string;
        spaceComplexity: string;
        note?: string;
        method?: string;
        matrixSize: number;
    };
}
