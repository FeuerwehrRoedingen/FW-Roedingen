
export type MatrixEntry = {
  value: {
    id: number;
    name: string;
  };
  marked: boolean;
}

export type Matrix = MatrixEntry[];
