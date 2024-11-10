const getEnvironments = () => {
  const env = process.env.NODE_ENV;
  let apiUrl, appMode;
  switch (env) {
    case 'sit':
      apiUrl = process.env.NEXT_PUBLIC_API_URL_SIT;
      appMode = process.env.NEXT_PUBLIC_APP_MODE_SIT;
      break;
    case 'uat':
      apiUrl = process.env.NEXT_PUBLIC_API_URL_UAT;
      appMode = process.env.NEXT_PUBLIC_APP_MODE_UAT;
      break;
    case 'production':
      apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
      appMode = process.env.NEXT_PUBLIC_APP_MODE_PROD;
      break;
    default:
      apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
      appMode = process.env.NEXT_PUBLIC_APP_MODE_DEV;
  }

  return {
    env: {
      NEXT_PUBLIC_API_URL: apiUrl,
      NEXT_PUBLIC_APP_MODE: appMode,
    },
  };
};

module.exports = {
  ...getEnvironments(),
};
