import React from "react";
import { Link } from "react-router-dom";

export default function Pagination(props) {
  const { page, limit, totalRows } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.length === 1 ? (
        ""
      ) : (
        <ul className="pagination home-product__pagination">
          <li className="pagination-item">
            {parseInt(page) - 1 <= 0 ? (
              ""
            ) : (
              <Link
                to={`?page=${parseInt(page) - 1}`}
                className="pagination-item__link pagination-item__btn pagination-item__btn-next"
              >
                <i className="pagination-item__icon fas fa-chevron-left" />
              </Link>
            )}
          </li>

          {pageNumbers.map((number, index) => {
            return (
              <li
                className={
                  number === parseInt(page)
                    ? "pagination-item pagination-item__active"
                    : "pagination-item"
                }
                key={index}
              >
                <Link to={`?page=${number}`} className="pagination-item__link">
                  {number}
                </Link>
              </li>
            );
          })}
          <li className="pagination-item">
            {parseInt(page) === pageNumbers.length ? (
              ""
            ) : (
              <Link
                to={`?page=${parseInt(page) + 1}`}
                className="pagination-item__link pagination-item__btn pagination-item__btn-next"
                disabled={parseInt(page) === pageNumbers.length}
              >
                <i className="pagination-item__icon fas fa-chevron-right" />
              </Link>
            )}
          </li>
        </ul>
      )}
    </>
  );
}
