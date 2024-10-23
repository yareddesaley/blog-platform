export const baseuri = "http://localhost:4444";
export const postRegister = async (uri, body) => {
  const registerResponse = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const registerData = await registerResponse.json();
  if (!registerResponse.ok) {
    let message;
    if (registerData?.message) {
      message = registerData.message;
    } else {
      message = registerData;
    }
    return { error: true, message };
  }
  return registerData;
};

//get all posts
export const getPosts = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};
