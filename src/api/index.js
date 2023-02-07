import axios from 'axios';

const userURL = {
  baseUrl: 'http://localhost:8081',
};
const studyURL = {
  baseUrl: 'http://localhost:8081',
};
const attendURL = {
  baseUrl: 'http://localhost:8081',
};
const chatMessagesURL = {
  baseUrl: 'http://localhost:8081',
};
const chatRoomsURL = {
  baseUrl: 'http://localhost:8081',
};
const studyMembersURL = {
  baseUrl: 'http://localhost:8081',
};
/* check */
function signUp(payload) {
  return axios.post(`${userURL.baseUrl}/api/user`, payload);
}
/* check */
async function login(payload) {
  await axios.get(`${userURL.baseUrl}/api/user?userId=${payload}`).then(res => {
    // eslint-disable-next-line prettier/prettier
    localStorage.setItem('user', JSON.stringify({ userId: res.data.memberId, id: res.data.memberId, }));
    localStorage.setItem('area', JSON.stringify(res.data.dongNm));
    return;
  });
}
/* check */
function addStudy(payload) {
  // return axios.post(`${studyURL.baseUrl}/${payload.type}`, payload);
  return axios.post(`${studyURL.baseUrl}/board`, payload);

}

function studyAttend(payload) {
  return axios.post(`${attendURL.baseUrl}/studyAttend`, payload);
}
async function addArea(payload) {
  // eslint-disable-next-line prettier/prettier
  return await axios.patch(`${userURL.baseUrl}/user/${payload.name}`, { "dongList": payload.dongList });
}
function deleteChatRoom(payload) {
  return axios.delete(`${chatRoomsURL.baseUrl}/chat?roomId=${payload}`);
}
function deleteChaMessages(payload) {
  return axios.delete(`${chatMessagesURL.baseUrl}/messages?roomId=${payload}`);
}
function addMembersForm(payload) {
  return axios.post(`${studyMembersURL.baseUrl}/api/members`, payload);
}
function addMembers(payload) {
  const memberInfo = {
    title: payload.title,
    member: payload.member,
    manager: false,
  };
  // eslint-disable-next-line prettier/prettier
  // axios.get(`${studyMembersURL.baseUrl}/member?title=${payload.title}`).then(res => {
  //   const userList = res.data.member.memberId;
  //   // eslint-disable-next-line prettier/prettier
  //   return axios.patch(`${studyMembersURL.baseUrl}/member/${res.data[0].id}`, { "user": userList.concat(memberInfo) });
  // });
  return axios.post(`${studyMembersURL.baseUrl}/api/members`, memberInfo);
}
function renewArea(payload) {
  localStorage.setItem('area', JSON.stringify(payload.area));
  axios.patch(`${userURL.baseUrl}/api/user/${payload.userId}`, {
    region: payload.regions
  });
}
export {
  signUp,
  login,
  addStudy,
  studyAttend,
  addArea,
  deleteChatRoom,
  deleteChaMessages,
  addMembersForm,
  addMembers,
  renewArea,
};
