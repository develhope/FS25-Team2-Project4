import { useSignup } from "../../../hooks/Form/useSignup";
import { Button } from "../../Buttons/Button/Button";
import { useLocation } from "react-router-dom";

import EditNoteIcon from "@mui/icons-material/EditNote";
import StartIcon from "@mui/icons-material/Start";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./Signup.module.scss";

export function Signup({ setShowPopup = null, setChangeToSignup = null }) {
  const { data, passError, handleInput, handleSubmit } = useSignup();
  const location = useLocation();

  return (
    <div className={`${classes.container}`}>
      <header className={classes.title}>
        <h1>Signup</h1>
        {setShowPopup && ( //mostra la X solo quando il componente viene utilizzato come popup
          <div
            onClick={() => setShowPopup && setShowPopup()}
            className={classes.closeIco}
          >
            <CloseIcon />
          </div>
        )}
      </header>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setShowPopup && setShowPopup(false);
        }}
        className={classes.formBox}
      >
        <div className={classes.inputBox}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={handleInput}
            placeholder="Insert your username"
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleInput}
            placeholder="Insert your email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleInput}
            placeholder="Insert password"
            required
          />
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            value={data.confirmPass}
            onChange={handleInput}
            placeholder="Repeat password"
            required
          />
          {passError && <p>{passError}</p>}

          <label htmlFor="check" className={classes.checkLabel}>
            I agree with<span>Terms & Conditions</span>
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={data.check}
              onChange={handleInput}
              required
            />
          </label>
        </div>
        {/* aggiungere messaggio di errore se le pass non sono uguali */}
        <div className={classes.buttonsWrapper}>
          <Button
            style="primary"
            width="fill"
            type="submit"
            label="Sign up"
            icon={<EditNoteIcon fontSize="small" />}
            active={
              data.username &&
              data.password &&
              data.confirmPass &&
              data.confirmPass === data.password &&
              data.email &&
              data.check
            }
            prevPath={location.pathname}
          />

          <Button
            action={() => setShowPopup && setShowPopup(false)}
            prevPath={location.pathname}
            label="Skip"
            icon={<StartIcon fontSize="small" />}
          />
        </div>
        <div className={classes.message}>
          <p>Already have an account?</p>
          <span className={classes.login}>
            <Button action={() => setChangeToSignup(false)} label="Login" />
          </span>
        </div>
      </form>
    </div>
  );
}
