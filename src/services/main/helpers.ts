export const getFullUrl = (url: string, params?: object) => {
  let fullUrl = url;
  let queryString: string;

  if (params && Object.keys(params).length > 0) {
    queryString = Object.keys(params)
      .map((key) => `${key}=${params[key as keyof Object]}`)
      .join("&");
    fullUrl += `?${queryString}`;
  }

  return fullUrl;
};

export const errorHandler = (error: any) => {
  const { request, response } = error;
  if (response) {
    const { message } = response.data;
    const status = response.status;
    return {
      message,
      status,
    };
  } else if (request) {
    //request sent but no response received
    return {
      message: "Server time out",
      status: 503,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { message: "Opps! something went wrong while setting up request" };
  }
};
