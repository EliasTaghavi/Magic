import React from 'react';
import './userTransactions.css';
import {faEllipsisV, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserTransactions = () => {
  const transactions = [
    {
      id: Math.random().toFixed(2).toString(),
      name: 'row1',
      createdDate: '1400/09/15',
      status: true,
    },
    {
      id: Math.random().toFixed(2).toString(),
      name: 'row2',
      createdDate: '1400/09/15',
      status: false,
    },
    {
      id: Math.random().toFixed(2).toString(),
      name: 'row3',
      createdDate: '1400/09/15',
      status: true,
    },
    {
      id: Math.random().toFixed(2).toString(),
      name: 'row4',
      createdDate: '1400/09/15',
      status: true,
    },
    {
      id: Math.random().toFixed(2).toString(),
      name: 'row5',
      createdDate: '1400/09/15',
      status: false,
    }
  ]
  return (
    <div className="d-flex flex-column centered w-100">
      <div className="card cardPrimary px-3 w-100">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">تراکنش ها</p>
        </div>
        <div className="card-body w-100 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-start p-3">
          <div className="w-100 bg-white rounded boxShadow mt-3 p-3 table-responsive">
            <table className="text-center table-striped">
              <thead>
              <tr>
                <th style={{width: '15%', minWidth: 60}}>ردیف</th>
                <th style={{width: '40%', minWidth: 150}}>شرح تراکنش</th>
                <th style={{width: '15%', minWidth: 110}}>تاریخ</th>
                <th style={{width: '10%', minWidth: 80}}>وضعیت</th>
                <th style={{width: '20%', minWidth: 80}}>جزئیات</th>
                <th style={{width: '10%'}}>{null}</th>
              </tr>
              </thead>
              <tbody className="w-100 mt-3">
              {transactions && transactions.map((item, index) => {
                return (
                  <tr key={Math.random().toString()} className="tt" style={{borderBottom: index === transactions.length - 1 ? '' : '1px solid #ededed'}}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.createdDate}</td>
                    <td>
                      <span className="badge badge-success">تایید شده</span>
                    </td>
                    <td>-</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
