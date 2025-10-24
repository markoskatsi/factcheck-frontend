import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/404";
import SignIn from "./components/pages/SignIn";
import ContactUs from "./components/pages/ContactUs";
import "./App.css";


function App() {
  return (
    <Layout>
      <ContactUs />
    </Layout>
  );
}

export default App;
