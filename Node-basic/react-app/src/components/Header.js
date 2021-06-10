import PropTypes from "prop-types";
const Header = ({ title }) => {
  return (
    <div>
      <h1>Hello for {title}</h1>
    </div>
  );
};

Header.defaultProps = {
  tit: "Myh React App",
};

Header.porptypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
