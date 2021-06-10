const Header = ({ title }) => {
  return (
    <div>
      <h1>Hello for {title}</h1>
    </div>
  );
};

Header.defaultProps = {
  title: "Myh React App",
};

export default Header;
