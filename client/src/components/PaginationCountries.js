import React from "react";

export const PaginationCountries = ({ countriesPerPage, totalCountries, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination d-flex justify-content-center">
        {pageNumbers.map((number) => {
          return (
            <div className="">
              <li className="page-item" key={number}>
                <a href="#allCountries" className="page-link" onClick={() => paginate(number)}>
                  {number}
                </a>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
