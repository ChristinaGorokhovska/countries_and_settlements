import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Header } from "../components/Header";
import { InitialBanner } from "../components/InitialBanner";
import { Search } from "../components/Search";

import { Footer } from "../components/Footer";
import { DefaultTopCountries } from "../components/DefaultTopCountries";
import { AllCountriesList } from "../components/AllCountriesList";

export const MainPage = ({ isAdmin }) => {
  return (
    <div>
      <Header isAdmin={isAdmin} />
      <InitialBanner />

      <Search isAdmin={isAdmin} />
      <DefaultTopCountries />
      <AllCountriesList />
      <Footer />
    </div>
  );
};
