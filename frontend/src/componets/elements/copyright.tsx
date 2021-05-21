import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <div className="App">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          target="blank"
          href="https://www.linkedin.com/in/raherimihaja-tokiniaina-nirilanto-venerand-36294a15b/"
        >
          Power by RAHERIMIHAJA tokiniaina Nirilanto Venerand
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
