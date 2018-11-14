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
  return data.articles || (data.article = [data.article]);
};

export const getAllTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};
export const postArticle = async newArticle => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${newArticle.belongs_to}/articles`,
    newArticle
  );
  return data;
};

export const getArticleComments = async articleId => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${articleId}/comments`
  );
  return data.comments;
};

export const postArticleComments = async comment => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${comment.belongs_to}/comments`,
    comment
  );
  return data.comment;
};

export const patchVotes = async (section, id, vote) => {
  const { data } = await axios.patch(
    `${BASE_URL}/${section}/${id}?vote=${vote}`
  );
  return data;
};

export const deleteComment = async commentId => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${commentId}`);
  //console.log(data);
  return data;
};

export const getUserById = async userId => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
  //console.log(data);
  return data;
};

export const getUser = async userName => {
  const { data } = await axios.get(`${BASE_URL}/users/${userName}`);
  return data;
};
