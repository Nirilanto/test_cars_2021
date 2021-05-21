import React, { useEffect, useState } from "react";
import { Divider, Avatar, Grid, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import AccountCircleSharp from "@material-ui/icons/AccountCircleSharp";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import mapDispatchToProps from "../../redux/mapDispatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import CardComment from "./cardComment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

const Comment = (props: any) => {
  const classes = useStyles();
  let history = useHistory();
  const [listComments, setListComments] = useState([]);
  const [data, setData] = useState("");
  const { cars, id, addComment, me, comments, getAllComment, deleteComment } =
    props;
  const [current, setCurret] = useState<any>({});
  const { name } = current ?? {};

  useEffect(() => {
    const intervalEvent = setInterval(() => getAllComment(), 5000);
    return () => {
      clearInterval(intervalEvent);
    };
  }, []);

  useEffect(() => {
    let currCmt =
      comments &&
      comments.filter((i: any) => i.cars?.name?.trim() == name?.trim());
    setListComments(currCmt);
  }, [comments]);

  useEffect(() => {
    let news = cars.find((i: any) => i.name?.trim() == id);
    setCurret(news);
  }, [id, cars]);

  async function handleComment() {
    let dataSend = {
      body: data,
      users: {
        ...me,
      },
      cars: {
        ...current,
      },
    };
    const { succes } = await addComment(dataSend);
    if (succes) {
      setData("");
      getAllComment();
    }
  }

  const handleChange = (elem: any) => {
    setData(elem.target.value);
  };

  const handleDeleteCmt = async (elem: string) => {
    await deleteComment(elem);
    getAllComment();
  };

  return (
    <div style={{ padding: 14 }} className="App">
      <CardComment {...props} />
      <h1>Comments</h1>
      {me?.id ? (
        <Paper style={{ padding: "40px 20px" }}>
          {listComments?.map((item: any) => {
            const { body, users, date } = item;
            let itMe = me?.id == item.users.id;
            return (
              <div>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>{users?.name[0].toUpperCase()}</Avatar>
                  </Grid>
                  <Grid justify="flex-start" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {`${users?.name} ${itMe ? "(You)" : ""}`}
                      {itMe && (
                        <IconButton
                          onClick={() => handleDeleteCmt(item.id)}
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </h4>
                    <p style={{ textAlign: "left" }}>{body}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted <TimeAgo date={date} />
                    </p>
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              </div>
            );
          })}

          <div>
            <TextField
              value={data}
              onChange={handleChange}
              id="outlined-multiline-static"
              multiline
              rows={5}
              placeholder="Your comment"
              variant="outlined"
              fullWidth
            />
            <Button
              onClick={handleComment}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </Paper>
      ) : (
        <Paper variant="outlined">
          <Typography>
            You should authenticate yourself to see the comments
          </Typography>
          <Button
            onClick={() => history.push("/login")}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AccountCircleSharp />}
          >
            Login
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
