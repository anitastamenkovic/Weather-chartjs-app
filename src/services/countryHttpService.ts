// import { useQuery } from "react-query";

import { errorHandler, httpService } from "./main";
import { CountryType } from "../types";
import { useQuery } from "@tanstack/react-query";

const countriesURL =
  "https://countriesnow.space/api/v0.1/countries/flag/images";

const { http } = httpService(countriesURL);

const fetchCountries = async () => {
  try {
    const response = await http.get(countriesURL);
    const data: CountryType[] = response.data?.data;
    const countries = data.map((country: CountryType) => {
      return { id: country.name, name: country.name, flag: country.flag };
    });
    return countries;
  } catch (error: any) {
    const { message: errorMessage } = errorHandler(error);
    console.log(errorMessage);
    return errorMessage;
  }
};

export const useFetchCountries = () => {
  const { data, error, isError, isLoading } = useQuery(
    ["countries"],
    fetchCountries
  );

  return { data, error, isError, isLoading };
};
