import PropTypes from "prop-types";

const Layout = ({ children }) => (
  <main>
    {/* <Nav /> */}
    {children}
    <style jsx global>{`
      * {
        font-family: "Roboto", sans-serif;
      }
      ::-webkit-scrollbar {
        width: 0px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: transparent;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: transparent;
      }
      html {
        width: 100%;
        height: 100%;
      }
      body {
        margin: 0;
        user-select: none;
        width: 100%;
        height: 100%;
        // padding: 25px 50px;
      }
      a {
        color: #22bad9;
      }
      p {
        font-size: 14px;
        line-height: 24px;
      }
      article {
        margin: 0 auto;
        max-width: 650px;
      }
      button {
        align-items: center;
        background-color: #22bad9;
        border: 0;
        color: white;
        display: inline-flex;
        padding: 5px 7px;
        margin-right: 1px;
      }
      button:active {
        background-color: #1b9db7;
        transition: background-color 0.3s;
      }
      button:focus {
        outline: none;
      }

      hr {
        height: 1px;
        border: none;
        background: #ececec;
        margin: 20px 0;
      }
    `}</style>
  </main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
