import { useNavigate } from "react-router-dom";
import { getAuthToken, getStoredUser } from "../utils/authStorage";

export function ErrorPage() {
    const navigate = useNavigate();

    const token = getAuthToken();
    const tokenUser = getStoredUser();

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>

            {token ? (
                <>
                    <p>Signed in as {tokenUser?.name || tokenUser?.email || "Organizer"}.</p>
                    <p>You are logged in.</p>
                    <button onClick={() => navigate("/organizer")}>
                        Go to Dashboard
                    </button>
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <button onClick={() => navigate("/")}>
                        Go to Login
                    </button>
                </>
            )}
        </div>
    );
}
