export const enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortProperties<T extends string> = {
  [P in T]?: SortDirection;
};
