import { type getDictionary } from '../../../lib/dictionary';

export interface IStyledTableThProps {
  numberOfColumns?: string;
  withoutCursor?: boolean;
  isOvertimeCheckbox?: boolean;
  paddingTable?: string;
  widthTabe?: string;
}

export interface ITableTd {
  isOvertimeCheckbox?: boolean;
  paddingTable?: string;
  isResourceTable?: boolean;
}

export interface IColumn {
  id: string;
  paddingTable?: string;
  widthTable?: string;
  isSorted: boolean;
  isSortedDesc: boolean;
  render: any;
  withoutCursor?: boolean;
}

export interface ITableProps {
  columns: any;
  data: any;
  numberOfColumns?: any;
  isOvertimeCheckbox?: any;
  tableDataRef?: any;
  columnMargin?: any;
  isResourceTable?: boolean;
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
