import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import CONFIG from "src/configs/configs.json";
import { ICars, IProps} from "src/redux/types"

const useStyles = makeStyles({
  root: {
    //maxWidth: 345,
  },
  media: {
    height: 400,
  },
});

interface Props extends IProps {
  id?:string;
}

export default function MediaCard(props: Props) {
  const [current, setCurret] = useState<any>({});
  const { cars, id } = props;
  const { name, type, abut } = current || {};

  useEffect(() => {
    let news = cars?.find((i: ICars) => i.name?.trim() === id);
    setCurret(news);
  }, [id, cars]);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${CONFIG.URL_IMAGE + name?.trim()}.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {abut}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
