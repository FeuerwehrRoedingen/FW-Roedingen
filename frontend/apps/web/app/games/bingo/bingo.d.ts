
export type IValueType = {
  id: number;
  name: string;
}

export type MatrixEntry = {
  value: IValueType;
  marked: boolean;
}

export type Matrix = MatrixEntry[];
