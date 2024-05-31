import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/team/" + params.id);
  console.log("response", res);
  return res.data;
};

export const listPageLoader = async () => {
  const res = await apiRequest.get("/team");
  return res.data;
};
