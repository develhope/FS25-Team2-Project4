import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const btnStyle = {
  height: "2.5rem",
  borderRadius: "1.5rem",
  display: "grid",
  placeItems: "center",
  width: "2.5rem",
  paddingLeft: ".45rem",
  paddingRight: ".1rem",
};

/* const textStyle = {
  fontSize: "1rem",
}; */

export function GoogleLoginBtn() {
  return (
    <LoginSocialGoogle
      isOnlyGetToken
      client_id={
        "511651854576-4md3njisbf61ha7i2b0hn4nmp7gug82q.apps.googleusercontent.com"
      }
      onResolve={({ provider, data }) => {
        console.log(provider, data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton style={btnStyle}>
        <span /* style={textStyle} */></span>
      </GoogleLoginButton>
    </LoginSocialGoogle>
  );
}
