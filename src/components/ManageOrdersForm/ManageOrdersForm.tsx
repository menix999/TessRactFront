'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { format } from 'date-fns';

import { IManageOrdersFormProps, IOrderList } from './ManageOrdersForm.types';
import Table from '../Table/Table';
import OrderStatus from '../OrderStatus/OrderStatus';
import ActionIcon from '@/assets/ActionIcon';
import ActionButton from '../ActionButton/ActionButton';

type Action = { type: 'SET_ORDERS'; payload: any };

type State = {
  orders: IOrderList[];
};

const initialState: State = {
  orders: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ORDERS': {
      return {
        ...state,
        orders: action.payload,
      };
    }
    default:
      return state;
  }
};

const DeliverySummaryForm = ({ translation, ordersListData }: IManageOrdersFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const test = [
    {
      content: 'test',
    },
    {
      content: 'test2',
    },
  ];

  useEffect(() => {
    dispatch({ type: 'SET_ORDERS', payload: ordersListData });
  }, []);

  const handleChangeStatusRecord = () => {
    console.log('test');
  };

  const handleActionButtonContent = () => {
    return (
      <div className='flex flex-col bg-white w-28 shadow-2xl rounded-xl'>
        <span className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover rounded-t-xl'>
          Nowe
        </span>
        <span className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover '>
          W trakcie
        </span>
        <span className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover '>
          Wysłane
        </span>
        <span className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover '>
          Dostarczone
        </span>
        <span className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover rounded-b-xl'>
          Anulowane
        </span>
      </div>
    );
  };

  const ordersData = useMemo(() => {
    return state.orders.map(
      ({ id, orderDate, firstName, surname, street, apartmentNumber, orderPositions, status }) => {
        let totalPrice = 0;

        orderPositions.forEach((product) => {
          totalPrice += product.quantity * product.price;
        });

        return {
          orderNumber: <span className='text-base'>{id}</span>,
          orderDate: (
            <span className='text-base'>{format(new Date(orderDate), 'yyyy.MM.dd | HH:mm')}</span>
          ),
          client: (
            <span className='text-base'>
              {firstName} {surname}
            </span>
          ),
          deliveryAddress: (
            <span className='text-base'>
              {street} {apartmentNumber}
            </span>
          ),
          sum: <span className='text-base'>{totalPrice.toFixed(2)} zł</span>,
          status: (
            <div>
              <OrderStatus status={status} translation={translation} />
            </div>
          ),
          action: (
            <div className='relative'>
              <ActionButton handleContent={handleActionButtonContent} />
            </div>
          ),
        };
      }
    );
  }, [state.orders, translation]);

  const columns = useMemo(
    () => [
      {
        Header: translation.orderNumber,
        accessor: 'orderNumber',
        widthTable: '10%',
      },
      {
        Header: translation.orderDate,
        accessor: 'orderDate',
        widthTable: '10%',
      },
      {
        Header: translation.client,
        accessor: 'client',
        widthTable: '10%',
      },
      {
        Header: translation.deliveryAddress,
        accessor: 'deliveryAddress',
        widthTable: '10%',
      },
      {
        Header: translation.sum,
        accessor: 'sum',
        widthTable: '10%',
      },
      {
        Header: translation.status,
        accessor: 'status',
        widthTable: '10%',
      },
      {
        // Header: translation.status,
        accessor: 'action',
        widthTable: '4%',
      },
    ],
    []
  );

  return (
    <div className='flex flex-col w-full gap-10'>
      <Table
        columns={columns}
        data={ordersData}
        numberOfColumns={columns.length}
        translation={translation}
      />
    </div>
  );
};

export default DeliverySummaryForm;
