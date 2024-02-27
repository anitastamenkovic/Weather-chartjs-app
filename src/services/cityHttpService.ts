import { useQuery } from "@tanstack/react-query";
import { httpService, errorHandler } from "./main";

const citiesURL = "https://countriesnow.space/api/v0.1/countries/cities";

const { http } = httpService(citiesURL);

const fetchCities = async (country: string) => {
  try {
    const response = await http.post(citiesURL, { country: country });
    const data = response.data.data;
    const cities = data.map((city: string) => {
      return { id: city, name: city, checked: false };
    });
    return cities;
  } catch (error: any) {
    const { message: errorMessage } = errorHandler(error);
    return errorMessage;
  }
};

export const useFetchCities = (country: string, isEnabled: boolean) => {
  const { data, error, isError, isLoading } = useQuery(
    ["cities", country],
    () => fetchCities(country),
    { enabled: isEnabled }
  );

  return { data, error, isError, isLoading };
};
