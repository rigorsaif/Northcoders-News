import axios from "axios";
const BASE_URL = "https://quiet-thicket-37970.herokuapp.com/api";

export const getArticlesAndTopicsController = async (
  topics,
  slug,
  articleId
) => {
  const { data } = await axios.get(
    `${BASE_URL}/${topics || ""}${
      slug ? "/" + slug : ""
    }/articles/${articleId || ""}`
  );
  return data.articles;
};

export const getAllTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};
export const postArticlesAndTopicsController = async (
  topics,
  slug,
  articleId
) => {
  const { data } = await axios.post(
    `${BASE_URL}/${topics || ""}${
      slug ? "/" + slug : ""
    }/articles/${articleId || ""}`,
    {}
  );
  console.log(data.articles);
  return data;
};

export const getArticleComments = async articleId => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${articleId}/comments`
  );
  return data.comments;
};

export const postArticleComments = async (articleId, comment) => {
  const { data } = await axios.post(`${BASE_URL}/${articleId}/comments`, {
    comment
  });
  console.log(data.comments);
  return data.comments;
};

export const patchArticleVotes = async (articleId, vote) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${articleId}?vote=${vote}`
  );
  console.log(data);
  return data;
};

export const patchCommentVotes = async (commentId, vote) => {
  const { data } = await axios.patch(
    `${BASE_URL}/comments/${commentId}?vote=${vote}`
  );
  console.log(data.comment);
  return data.comment;
};

export const deleteComment = async commentId => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${commentId}`);
  console.log(data);
  return data;
};

export const getUserById = async userId => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
  console.log(data);
  return data;
};

export const getUser = async userName => {
  const { data } = await axios.get(`${BASE_URL}/users/${userName}`);
  return data;
};
