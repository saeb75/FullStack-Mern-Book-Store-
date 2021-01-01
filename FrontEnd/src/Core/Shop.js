import React, { useState, useEffect } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories, getFilterProduct, list } from "./apiGetProducts";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./FixPrice";

const Shop = () => {
  const [myFilter, setMyFilter] = useState({
    filters: { catogory: [], price: "" },
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filterResult, setFilterResult] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setData(data);
      }
    });
  };

  const loadFilterResults = newFilter => {
    let firstSkip = 0;

    getFilterProduct(firstSkip, limit, newFilter).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResult(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;

    getFilterProduct(toSkip, limit, myFilter.filter).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResult([...filterResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const handleFilter = (filter, filterBy) => {
    const newFilters = { ...myFilter };
    newFilters.filters[filterBy] = filter;

    if (filterBy === "price") {
      let priceFilter = handlePrice(filter);
      newFilters.filters[filterBy] = priceFilter;
    }
    setMyFilter(newFilters);
    loadFilterResults(myFilter.filters);
  };

  const handlePrice = value => {
    let data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id == parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  useEffect(() => {
    init();
    loadFilterResults(myFilter.filters);
  }, []);

  const loadMoreButton = () => {
    if (size > 0 && size >= limit) {
      return (
        <button onClick={loadMore} className="btn btn-warning">
          Load More
        </button>
      );
    }
  };

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and Finde Book"
        classnames="container-fluid"
      >
        <div className="row">
          <div className="col-md-4">
            <h5>Filter By Categories</h5>
            <ul>
              <CheckBox Categories={data} handleFilter={handleFilter} />
            </ul>

            <h5>Filter By Price</h5>
            <div>
              <RadioBox prices={prices} handleFilter={handleFilter} />
            </div>
          </div>

          <div className="col-md-8">
            <h2 className="mb-3">Products</h2>
            <div className="row">
              {filterResult.map((item, i) => {
                return <Card product={item} />;
              })}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
