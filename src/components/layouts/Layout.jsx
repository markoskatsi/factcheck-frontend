import Header from "./Header";
import Footer from "./Footer";

import "./Layout.scss";

function Layout(props) {
  return (
    <div className="centerpane">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
