import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "./Layout.scss";

function Layout(props) {
  return (
    <div className="centerpane">
      <Header loggedInUser={props.loggedInUser} />
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
