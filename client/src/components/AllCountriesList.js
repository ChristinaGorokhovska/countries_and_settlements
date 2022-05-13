import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Countries } from "./Countries";
import { PaginationCountries } from "./PaginationCountries";

export const AllCountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(4);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      const res = await Axios.get("/api/main/search/countries");
      setCountries(res.data);
      setLoading(false);
    };

    getCountries();
  }, []);

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const length_countries = parseInt(countries.length);

  return (
    <div>
      <h3 id="allCountries" className="text-primary text-center py-5 mt-4">
        Усі країни
      </h3>
      <Countries countries={currentCountry} loading={loading} />
      <PaginationCountries countriesPerPage={countriesPerPage} totalCountries={length_countries} paginate={paginate} />
    </div>
  );
};
