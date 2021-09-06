import GoogleButton from "../../components/GoogleButton";
import AdminTabs from "../../components/Tabs";
import { useGlobalContext } from "../../RecipesContext";
import "./Admin.scss";

export default function Admin() {
    const { userData } = useGlobalContext();

    return (
        <div className="admin-page">
            <section className="admin-section">
                {!userData && <p className="text">Make yourself at home by pressing</p>}
                <GoogleButton />
            </section>
            {userData?.user.isAdmin && <AdminTabs />}
        </div>
    );
}
