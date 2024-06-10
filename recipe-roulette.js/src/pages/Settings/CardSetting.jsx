import classes from "./Settings.module.scss";

export function CardSetting({
    editing,
    avatar,
    signupData,
    handleAvatarChange,
    handleSignupInput,
    handleSaveClick,
    handleEditClick,
    passError,
}) {
    return (
        <>
            {editing ? (
                <div className={classes.editProfileSection}>
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
                            Profile image
                        </label>
                    </div>
                    <div className={classes.editForm}>
                        <label>Edit ID and Email</label>
                        <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupInput} />
                        <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupInput} />
                        <label>Change password</label>
                        <input type="password" name="password" placeholder="Set new password" value={signupData.password} onChange={handleSignupInput} />
                        <input type="password" name="confirmPass" placeholder="Repeat new password" value={signupData.confirmPass} onChange={handleSignupInput} />
                        {passError && <p className={classes.error}>{passError}</p>}
                        <button className={classes.saveButton} onClick={handleSaveClick}>Save Changes</button>
                    </div>
                </div>
            ) : (
                <div className={classes.profileSection}>
                    <img src={avatar} alt="Profile" className={classes.profilePicture} />
                    <h2 className={classes.profileName}>{signupData.username}</h2>
                    <p className={classes.profileEmail}>{signupData.email}</p>
                    <button className={classes.editButton} onClick={handleEditClick}>Edit Informations</button>
                </div>
            )}
        </>
    );
}