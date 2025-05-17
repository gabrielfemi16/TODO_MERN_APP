import DashBoard from "../DashBoard/DashBoard"
import "./settings.css"

const Settings = () => {
  return (
    <DashBoard>
        <h1 className="lightSalmon_text settings_title">Update Profile</h1>
        <form className="darkBlue_bg">
            <label htmlFor="pics" className="lightSalmon_text">Upload photo</label>
            <input type="file" id="pics" />

            <label htmlFor="username" className="lightSalmon_text">username</label>
            <input type="text" id="username"/>
            <button className="lightSalmon_bg">Update</button>
        </form>
    </DashBoard>
  )
}

export default Settings