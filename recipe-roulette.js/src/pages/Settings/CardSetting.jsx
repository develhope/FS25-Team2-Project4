import classes from "./Settings.module.scss";
import { Button } from "../../components/Buttons/Button/Button";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useAuth } from "../../hooks/Auth/useAuth";

export function CardSetting({
    editing,
    avatar,
    signupData,
    handleAvatarChange,
    handleSignupInput,
    handleSaveClick,
    handleDiscardClick,
    handleEditClick,
    passError,
}) {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className={classes.profileSection}>
                <h2 className={classes.profileName}>Not Logged In</h2>
                <p className={classes.profileEmail}>Please log in to edit your profile</p>
            </div>
        );
    }

    return (
        <>
            {editing ? (
                <div className={classes.editProfileSection}>
                    <section className={classes.profileImageSection}>
                        <img src={avatar} alt="Profile" className={classes.profilePicture} />
                        <div className={classes.editProfileImageButtonWrapper}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={classes.editProfileImageButton}
                                id="profileImageInput"
                            />
                            <label htmlFor="profileImageInput" className={classes.editProfileImageButtonLabel}>
                                <ModeEditOutlinedIcon fontSize="small" />
                                Profile image
                            </label>
                        </div>
                    </section>
                    <div className={classes.editForm}>
                        <section className={classes.formSection}>
                            <label>Edit ID and Email</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signupData.username}
                                onChange={handleSignupInput}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signupData.email}
                                onChange={handleSignupInput}
                            />
                        </section>

                        <section className={classes.formSection}>
                            <label>Change password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Set new password"
                                value={signupData.password}
                                onChange={handleSignupInput}
                            />
                            <input
                                type="password"
                                name="confirmPass"
                                placeholder="Repeat new password"
                                value={signupData.confirmPass}
                                onChange={handleSignupInput}
                            />
                            {passError && <p className={classes.error}>{passError}</p>}
                        </section>

                        <div className={classes.bottomItems}>
                            <Button
                                style="primary"
                                width="fill"
                                action={handleSaveClick}
                                label="Save Changes"
                                icon={<DoneAllIcon fontSize="small" />}
                            />
                            <Button
                                width="fill"
                                action={handleDiscardClick}
                                label="Discard Changes"
                                icon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.profileSection}>
                    <img src={avatar} alt="Profile" className={classes.profilePicture} />
                    <h2 className={classes.profileName}>{signupData.username}</h2>
                    <p className={classes.profileEmail}>{signupData.email}</p>
                    <Button
                        style="primary"
                        width="fill"
                        action={handleEditClick}
                        label="Edit Information"
                        icon={<EditNoteIcon fontSize="small" />}
                    />
                </div>
            )}
        </>
    );
}
