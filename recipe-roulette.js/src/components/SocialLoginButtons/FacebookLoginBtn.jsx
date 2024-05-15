import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";

const btnStyle = {
    height: "2.5rem",
    borderRadius: "1.5rem",
    display: "grid",
    placeItems: "center",
    width: "10rem"
};

const textStyle = {
  fontSize: "1rem",
};

export function FacebookSocialBtn() {
  return (
    <LoginSocialFacebook
      isOnlyGetToken
      appId="1508646076662050"
      onResolve={({ provider, data }) => {
        console.log(provider, data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <FacebookLoginButton style={btnStyle}>
        <span style={textStyle}>Facebook</span>
      </FacebookLoginButton>
    </LoginSocialFacebook>
  );
}
