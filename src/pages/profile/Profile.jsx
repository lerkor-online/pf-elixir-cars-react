import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

const Profile = () => {
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await axios(userDetailsByIdUrl, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_metadata = await metadataResponse.data;

        setUserMetadata(user_metadata);

        await axios.post(`${URL}users`, {
          email: user_metadata.email,
          name: user_metadata.name,
          password: accessToken,
        });
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [domain, getAccessTokenSilently, user.sub]);

  return (
    isAuthenticated && (
      <div>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <>
            <img src={userMetadata.picture} alt={userMetadata.name} />
            <h2>{userMetadata.name}</h2>
            <p>{userMetadata.email}</p>
            <JSONPretty data={userMetadata} />
          </>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
