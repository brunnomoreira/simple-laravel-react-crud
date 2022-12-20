import { AppContextProvider } from "./AppContext";
import { AuthContextProvider } from "./AuthContext";

const IndexContext = (props) => {
    return (
        <AppContextProvider>
            <AuthContextProvider>
                { props.children }
            </AuthContextProvider>
        </AppContextProvider>
    );
}

export default IndexContext;