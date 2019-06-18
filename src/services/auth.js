export const parseAccessToken = () => {
  const match = RegExp('[#&]access_token=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

export default parseAccessToken;
