import React from 'react';

const Alert = ({ msg, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      <i
        className={
          type === 'success'
            ? 'fa fa-check-square'
            : type === 'info'
            ? 'fa fa-info-circle'
            : type === 'warning'
            ? 'fa fa-exclamation-circle'
            : 'fa fa-times-circle'
        }
      />{' '}
      {msg}
    </div>
  );
};

export default Alert;
