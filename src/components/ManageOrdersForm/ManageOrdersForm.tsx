'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { format } from 'date-fns';

import { IManageOrdersFormProps, IOrderList } from './ManageOrdersForm.types';
import Table from '../Table/Table';
import OrderStatus from '../OrderStatus/OrderStatus';
import ActionIcon from '@/assets/ActionIcon';
import ActionButton from '../ActionButton/ActionButton';
import { OrderStatuses } from '@/constants/constants';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext/AuthContext';
import ToastifyText from '../ToastifyText/ToastifyText';
import { toast } from 'react-toastify';

type Action = { type: 'SET_ORDERS'; payload: any } | { type: 'SET_STATUS'; payload: any }

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
    };
    case 'SET_STATUS': {
      const ordersWithChangedStatus = state.orders.map((order) => {
        if (order.id === action.payload.orderId) {
          return {
            ...order,
            status: action.payload.status,
          };
        }
        return order;
      });

      return {
        ...state,
        orders: ordersWithChangedStatus
      }
    }
    default:
      return state;
  }
};

const DeliverySummaryForm = ({ translation, ordersListData }: IManageOrdersFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { statuses } = OrderStatuses(translation);

  const { userToken } = useAuth();

  useEffect(() => {
    dispatch({ type: 'SET_ORDERS', payload: ordersListData });
  }, []);

  const handleChangeStatusRecord = async (nameValue: string, orderId: number) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Order/${orderId}`,
        {
          statusName: nameValue,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if(response) {
        dispatch({ type: 'SET_STATUS', payload: { orderId, status: nameValue } });
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.yourStatusHasBeenChanged}
            type='success'
          />
        );
      }

    } catch (error) {
      console.log('error', error);
      toast.success(
        <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.unexpectedErrorWhileChangingStatus}
          type='success'
        />
      );
    }
  };

  const handleActionButtonContent = (actualStatus: string, orderId: number) => {
    return (
      <div className='flex flex-col bg-white w-28 shadow-2xl rounded-xl'>
        {statuses.map(({ nameValue, name, id }) => {
          if (actualStatus === nameValue) return null;
          return (
            <span
              className='font-medium text-sm py-2 px-3 hover:text-main-purple-hover hover:bg-main-gray-hover first:hover:rounded-t-xl last:hover:rounded-b-xl'
              key={id}
              onClick={() => handleChangeStatusRecord(nameValue, orderId)}
            >
              {name}
            </span>
          );
        })}
      </div>
    );
  };

  const ordersData = useMemo(() => {
    return state.orders.map(
      ({ id, orderDate, firstName, surname, street, apartmentNumber, orderPositions, status, finalPrice }) => {

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
          sum: <span className='text-base'>{finalPrice.toFixed(2)} zł</span>,
          status: (
            <div>
              <OrderStatus status={status} translation={translation} />
            </div>
          ),
          action: (
            <div className='relative'>
              <ActionButton handleContent={() => handleActionButtonContent(status, id)} />
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
