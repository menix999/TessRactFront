import { useSortBy, useTable } from 'react-table';
import { isEmpty } from 'lodash';

import { IColumn, ITableProps } from '../Table/Table.types';

const Table = ({
  columns,
  data = [],
  numberOfColumns = 1,
  // setSortedField,
  // setSortedDirection,
  isOvertimeCheckbox,
  tableDataRef,
  columnMargin,
  isResourceTable,
  translation,
}: ITableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const accessorFieldThatHaveToAvoid = [
    'chief',
    'companyName',
    'departmentsName',
    'overtimeName',
    'overtimeCheckbox',
    'dateTime',
    'employee',
    'resourceStatus',
  ];

  return (
    <table
      {...getTableProps()}
      ref={tableDataRef}
      className={`relative text-left w-full border-separate border-spacing-0 text-[14px] ${
        isResourceTable ? 'text-[14px]' : 'text-[12px]'
      }`}
    >
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
            {headerGroup.headers.map((column: IColumn, index: number) => (
              <th
                key={column.id || `column_${index}`}
                className={`sticky top-0 z-[13] ${
                  column.paddingTable ? column.paddingTable : 'py-2 px-3'
                } font-semibold bg-primaryBackground border-b border-mainBorder ${
                  column.widthTable ? `w-[${column.widthTable}]` : ''
                } ${!column.withoutCursor ? 'cursor-pointer' : 'cursor-auto'}`}
                style={{ width: column.widthTable }}
              >
                <div className='flex items-center'>
                  <div className='mt-auto text-secondaryText'>{column.render('Header')}</div>
                  <div className={`ml-2 mt-auto ${columnMargin}`}>
                    {column.isSorted && !accessorFieldThatHaveToAvoid.includes(column.id)
                      ? column.isSortedDesc
                        ? 'a'
                        : // <SortingAscendingIcon />
                          // <SortingDescendingIcon />
                          'd'
                      : ''}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {!isEmpty(data) ? (
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className={`py-2 ${
                        cell.column.paddingTable ? cell.column.paddingTable : 'px-3'
                      } font-medium ${isResourceTable ? 'border-b border-mainBorder' : ''} ${
                        isOvertimeCheckbox ? 'py-6 pl-4' : 'py-0'
                      }`}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody className='h-auto font-medium text-[18px]'>
          <tr>
            <td className='absolute flex w-full mt-[60px] justify-center'>
              {translation.noDataToDisplay}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default Table;
