const urlParams = new URLSearchParams(window.location.search);

export const isTestBackCompat = () => {
  return urlParams.get('testCallback') === 'true';
};
