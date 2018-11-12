import axios from "axios";
const BASE_URL = "https://quiet-thicket-37970.herokuapp.com/api";

export const getAllArticles = async (topics, slug, articleId) => {
  const { data } = await axios.get(
    `${BASE_URL}/${topics || ""}${
      slug ? "/" + slug : ""
    }/articles/${articleId || ""}`
  );
  console.log(data.articles);
  return data;
};
