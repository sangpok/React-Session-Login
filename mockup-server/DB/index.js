/** Lowdb */
import { JSONPreset } from 'lowdb/node';

const defaultData = {
  members: [
    {
      id: 0,
      email: '',
      password: '',
      nickname: '',
    },
  ],
};

const db = await JSONPreset('db.json', defaultData);

const updateMembers = (newData) => {
  db.data.members = [...db.data.members.filter(({ id }) => id !== newData.id), newData];
  db.write();
};

export const findUser = (target) => db.data.members.find(({ email }) => email === target);
export const hasEmail = (target) => !!findUser(target);
export const hasNickname = (target) =>
  !!db.data.members.find(({ nickname }) => nickname === target);

export const getUser = (userId) => db.data.members.find(({ id }) => id === userId);

export const createUser = (userData) => {
  const newUser = {
    id: db.data.members.length,
    ...userData,
  };

  db.data.members.push(newUser);
  db.write();
};

export const deleteUser = (userId) => {
  db.data.members = [...db.data.members.filter(({ id }) => id !== userId)];
  db.write();
};

export const updateUser = (newUserData) => {
  updateMembers(newUserData);
};
