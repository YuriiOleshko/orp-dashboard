const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key) || null;
  }
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
};

const del = (key) => localStorage.removeItem(key);

export default { set, get, del };
