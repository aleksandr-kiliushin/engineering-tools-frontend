import React from 'react';

const TduBasket = (props) => {

  const tableJsx = props.basketArr.map((i, index) => {
    return(
      <tr key={index}>
        <td align={'center'}>{i.price}</td>
        <td align={'center'}>{i.code}</td>
        <td align={'center'}>{i.designation}</td>
      </tr>
    )
  });

  return(
    <div>
      <table border = "1">
        <thead>
          <tr>
            <th width={80} align={'center'}>Price</th>
            <th width={100} align={'center'}>Code</th>
            <th width={800} align={'center'}>Designation</th>
          </tr>
        </thead>
        <tbody>
          {tableJsx}
        </tbody>
      </table>
    </div>
  );
}

export default TduBasket;