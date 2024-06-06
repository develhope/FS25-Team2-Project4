import classes from "./LoginPage.module.scss";
import { Login } from "../../components/authentication/login/Login";

export function LoginPage() {
  return (
    <section className={classes.pageBox}>
      <Login />
    </section>
  );
}
