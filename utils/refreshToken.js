import spotifyApi from "../lib/spotify";

export default async function refreshAccessToken(token) {
  try {
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log(refreshedToken);

    // spotifyApi.setAccessToken(token.accessToken);
    // spotifyApi.setRefreshToken(token.refreshToken);
    spotifyApi.setAccessToken(refreshedToken.access_token);
    spotifyApi.setRefreshToken(
      refreshedToken.refresh_token ?? token.refreshToken
    );

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 3600,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
