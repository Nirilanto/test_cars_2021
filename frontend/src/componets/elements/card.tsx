import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface Props {
  datas: any;
}

const CardElement = (props: Props) => {
  const { type, mark, name } = props.datas;
  const classes = useStyles();
  let history = useHistory();

  function handleClick() {
    history.push(`/show/${name.trim()}`)
  }

  return (
    <Grid item key={"card"} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={`/static/${name.trim()}.jpg`}
          title={mark}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {mark}
          </Typography>
          <Typography>{type}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            fullWidth
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardElement;
