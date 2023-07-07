import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getSubCategoryByCategoryCode } from "actions/services/CategoryServices";
// import qs from "query-string";
import { getAllBrandByCategoryCode } from "actions/services/CategoryActions";
import "./style.css";

const list_price = [
  {
    category: "may-anh",
    prices: [
      {
        label: "Dưới 800.000",
        value: "0,800000",
      },
      {
        label: "Từ 800.000 - 4.000.000",
        value: "800000,4000000",
      },
      {
        label: "Trên 4.000.000",
        value: "4000000,10000000000",
      },
    ],
  },
  {
    category: "tivi",
    prices: [
      {
        label: "Dưới 10.000.000",
        value: "0,10000000",
      },
      {
        label: "Từ 10.000.000 - 15.000.000",
        value: "10000000,15000000",
      },
      {
        label: "Từ 15.000.000 - 25.000.000",
        value: "15000000,25000000",
      },
      {
        label: "Trên 25.000.000",
        value: "25000000,10000000000",
      },
    ],
  },
  {
    category: "may-giat",
    prices: [
      {
        label: "Dưới 6.000.000",
        value: "0,6000000",
      },
      {
        label: "Từ 6.000.000 - 10.000.000",
        value: "6000000,10000000",
      },
      {
        label: "Từ 10.000.000 - 16.000.000",
        value: "10000000,16000000",
      },
      {
        label: "Trên 16.000.000",
        value: "14000000,10000000000",
      },
    ],
  },
  {
    category: "laptop",
    prices: [
      {
        label: "Dưới 5.000.000",
        value: "0,5000000",
      },
      {
        label: "Từ 5.000.000 - 10.000.000",
        value: "5000000,10000000",
      },
      {
        label: "Từ 10.000.000 - 20.000.000",
        value: "10000000,20000000",
      },
      {
        label: "Trên 20.000.000",
        value: "20000000,10000000000",
      },
    ],
  },
  {
    category: "dien-thoai",
    prices: [
      {
        label: "Dưới 500.000",
        value: "0,500000",
      },
      {
        label: "Từ 500.000 - 5.000.000",
        value: "500000,5000000",
      },
      {
        label: "Từ 5.000.000 - 20.000.000",
        value: "5000000,20000000",
      },
      {
        label: "Trên 20.000.000",
        value: "20000000,10000000000",
      },
    ],
  },
  {
    category: "may-tinh-bang",
    prices: [
      {
        label: "Dưới 1.000.000",
        value: "0,1000000",
      },
      {
        label: "Từ 1.000.000 - 5.000.000",
        value: "1000000,5000000",
      },
      {
        label: "Từ 5.000.000 - 20.000.000",
        value: "5000000,20000000",
      },
      {
        label: "Trên 20.000.000",
        value: "20000000,10000000000",
      },
    ],
  },
  {
    category: "thiet-bi-phu-kien",
    prices: [
      {
        label: "Dưới 80.000",
        value: "0,80000",
      },
      {
        label: "Từ 80.000 - 200.000",
        value: "80000,200000",
      },
      {
        label: "Từ 200.000 - 320.000",
        value: "200000,3200000",
      },
      {
        label: "Trên 320.000",
        value: "320000,10000000000",
      },
    ],
  },
];

const list_sort = [
  {
    label: 'Giá thấp đến cao',
    sortBy: 'price',
    sortValue: 'asc'
  },
  {
    label: 'Giá cao đến thấp',
    sortBy: 'price',
    sortValue: 'desc'
  },
  {
    label: 'Tên A-Z',
    sortBy: 'name',
    sortValue: 'asc'
  },
  {
    label: 'Tên Z-A',
    sortBy: 'name',
    sortValue: 'desc'
  },
]

export default function Filter(props) {
  const { category } = props;
  const history = useHistory();

  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterPrice, setFilterPrice] = useState({
    begin_price: '',
    end_price: ''
  })

  const params = new URLSearchParams(window.location.search);
  const sortBy = params.get("sort_by") ? params.get("sort_by") : "";
  const sortValue = params.get("sort_value") ? params.get("sort_value") : "";
  const price_search = params.get("price") ? params.get("price") : "";
  const brand = params.get("brand") ? params.get("brand") : "";

  useEffect(() => {
    getSubCategoryByCategoryCode(category)
      .then((res) => setSubcategories(res.data))
      .catch(() => setSubcategories({}));
    getAllBrandByCategoryCode(category)
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  }, [category, sortBy, sortValue, price_search, brand]);

  const addQuery = (key, value) => {
    let pathname = window.location.pathname;
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  // const removeQuery = (key) => {
  //   let pathname = window.location.pathname;
  //   let searchParams = new URLSearchParams(window.location.search);
  //   searchParams.delete(key);
  //   history.push({
  //     pathname: pathname,
  //     search: searchParams.toString(),
  //   });
  // };

  const handleChange = (e) => {
    setFilterPrice({
      ...filterPrice,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitPrice = () => {
    const {begin_price, end_price} = filterPrice;
    if(begin_price === '') {
      addQuery('price', `0,${end_price}`)
    } else if(end_price === '') {
      addQuery('price', `0,${begin_price}`)
    } else if(parseInt(begin_price) > parseInt(end_price)) {
      addQuery('price', `${end_price},${begin_price}`)
    } else {
      addQuery('price', `${begin_price},${end_price}`)
    }
  }

  return (
    <>
      <div className="col l-2-4 m-0 c-0" style={{ paddingBottom: "50px" }}>
        <nav className="filter__bar">
          <h3 className="category__heading">Danh mục sản phẩm</h3>
          <ul className="category-list">
            {subcategories?.map((item) => {
              return (
                <li className="category-item" key={item.id}>
                  <Link
                    to={`/${category}/${item.code}`}
                    className="category-item__link"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="filter__bar">
          <h3 className="category__heading">Sắp xếp</h3>
          <ul className="category-list">
            {list_sort.map((item, index) => {
              return (
                <li className="category-item category-item__filter" key={index}>
                  <div className="item" onClick={() => {
                    addQuery("sort_by", item.sortBy)
                    addQuery("sort_value", item.sortValue)
                  }}>
                    <span className={sortBy === item.sortBy && sortValue === item.sortValue ? 'selected' : ''}>{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="filter__bar">
          <h3 className="category__heading">Giá</h3>
          <ul className="category-list">
            {list_price
              .filter((item) => item.category === category)[0]
              .prices.map((price, index) => {
                return (
                  <li className="category-item category-item__filter" key={index}>
                    <div className="item" onClick={() => addQuery("price", price.value)}>
                      <span className={price_search === price.value ? 'selected' : ''}>{price.label}</span>
                    </div>
                  </li>
                );
              })}
            <li className="category-item category-item__filter category-item__filter-form">
              <div className="price-small-text">Chọn khoảng giá</div>
              <div className="input-group">
                <input pattern="[0-9]*" placeholder="Giá từ" value={filterPrice.begin_price} name="begin_price" onChange={handleChange} />
                <span>-</span>
                <input pattern="[0-9]*" placeholder="Giá đến" value={filterPrice.end_price} name="end_price" onChange={handleChange} />
              </div >
              <button onClick={handleSubmitPrice}>Áp dụng</button>
            </li>
          </ul>
        </div>
        <div className="filter__bar">
          <h3 className="category__heading">Thương Hiệu</h3>
          <ul className="category-list">
            {brands.map((item, index) => {
              return (
                <li className="category-item category-item__filter" key={index}>
                  <div className="item" onClick={() => addQuery("brand", item.code)}>
                    <span className={brand === item.code ? 'selected' : ''}>{item.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
