import Cry from "crypto-js";
export const enCrypt = (name) => {
  return Cry.AES.encrypt(name, "secret@key123").toString();
};
export const deCrypt = (name) => {
  return Cry.AES.decrypt(name, "secret@key123").toString(Cry.enc.Utf8);
};
