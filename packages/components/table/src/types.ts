export interface Pagination {
  start: number | undefined
  pageSize: number | undefined
  currentPage: number | undefined
}

export type RowsExecutor = ({
  pagination,
}) => Promise<any[]>

export type TotalExecutor = ({
  pagination,
  rows,
}) => Promise<number>

export interface LoadEvent {
  pagination: Pagination
  rows: any[]
  total: number
}
