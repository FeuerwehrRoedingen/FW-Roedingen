import { Router } from 'express'

import { renderSignUp } from '../components/signUp.js'
import { addMessageToken, getUser } from '../../../pocketbase/pb_oauth.js'
import { sendMessage } from '../firebase.js'

export const usersRouter = Router();

usersRouter.get('/signup', (req, res) => {
  const query = {
    redirect: req.query.redirect as string || ''
  };

  res
    .status(200)
    .send(renderSignUp(query));
});

usersRouter.post('/messageToken', (req, res) => {
  if(!req.body.token || !req.body.userID){
    return res.status(400).end();
  }

  addMessageToken(req.body.userID, req.body.token)
    .then(user => {
      return res.status(200).send(user).end();
    }, reason => {
      console.error(reason);
      return res.status(401).end();
    });
});

usersRouter.post('/sendMessage', (req, res) => {
  const {
    data,
    userID
  } = req.body;

  if(!data ||!userID){
    return res.status(400).end();
  }

  getUser(userID)
    .then(user => {
      if(!user.messageToken){
        return res.status(200).end();
      }
      sendMessage(user.messageToken, data)
        .then( msgID => {
          res.status(200).send(msgID).end();
        }, reason => {
          console.error(reason);
          res.status(400).end();
        })
    })

});