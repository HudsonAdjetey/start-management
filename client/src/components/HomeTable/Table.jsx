import React from "react";

const Table = ({ first, last, nameOfClass, gender, stID, currentItems }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{first}</th>
          <th>{last}</th>
          <th>{nameOfClass}</th>
          <th>{gender}</th>
          <th>{stID}</th>
        </tr>
      </thead>
      {/* TABLE BODY */}
      <tbody>
        {currentItems?.map((item, index) => {
          
          return (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.class}</td>
              <td>{item.gender}</td>
              <td>{item.id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
