import { createUser, deleteUser, hasEmail, hasNickname, updateUser } from '../DB/index.js';
import jsonServer from 'json-server';

import * as Session from '../Session/index.js';

/** Utils */
import { getCookieParams } from '../Utils/index.js';

/** @param {jsonServer.JsonServerRouter} router */
export const getMembersRoute = (router) => {
  router.post('/check/email', (req, res) => {
    if (hasEmail(req.body.email)) {
      return res.status(500).send({ statusCode: 1201, message: '이미 존재하는 이메일이삼' });
    }

    return res.sendStatus(200);
  });

  router.post('/check/nickname', (req, res) => {
    if (hasNickname(req.body.nickname)) {
      return res.status(500).send({ statusCode: 1202, message: '이미 존재하는 닉네임이삼' });
    }

    return res.sendStatus(200);
  });

  router.post('/signup', (req, res) => {
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname) {
      return res.status(500).send({ statusCode: 1201, message: '잘못된 데이터를 전송함' });
    }

    if (hasEmail(email)) {
      return res.status(500).send({ statusCode: 1202, message: 'Already exists email.' });
    }

    if (hasNickname(nickname)) {
      return res.status(500).send({ statusCode: 1203, message: 'Already exists nickname.' });
    }

    createUser({ email, password, nickname });

    return res.sendStatus(200);
  });

  router.patch('/', (req, res) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(500).send({ statusCode: 1201, message: '쿠키가 없' });
    }

    const cookieParams = getCookieParams(cookies);
    const sessionId = cookieParams.get('COMP_SESSION_ID');

    if (!sessionId) {
      return res.status(500).send({ statusCode: 1202, message: '세션 쿠키가 없' });
    }

    const user = Session.get(sessionId);

    if (!user) {
      return res.status(500).send({ statusCode: 1203, message: '저장된 유저 정보가 없' });
    }

    const newUserData = { ...user, ...req.body };

    Session.save(sessionId, newUserData);
    updateUser(newUserData);

    return res.status(200).send(newUserData);
  });

  router.delete('/', (req, res) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(500).send({ statusCode: 1201, message: '쿠키가 없' });
    }

    const cookieParams = getCookieParams(cookies);
    const sessionId = cookieParams.get('COMP_SESSION_ID');

    if (!sessionId) {
      return res.status(500).send({ statusCode: 1202, message: '세션 쿠키가 없' });
    }

    const user = Session.get(sessionId);

    if (!user) {
      return res.status(500).send({ statusCode: 1203, message: '저장된 유저 정보가 없' });
    }

    Session.deleteSession(sessionId);
    deleteUser(user.id);

    return res.clearCookie('COMP_SESSION_ID').sendStatus(200);
  });

  return router;
};
