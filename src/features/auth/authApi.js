import { users } from "../../data/_DATA";

// A login function to mimic making an async request for data

export function fetchLogin(username, password) {
  return (resolve, reject) =>
    setTimeout(() => {
      if (Object.keys(users).includes(username)) {
        const user = users[username];

        if (user.password !== password) {
          reject("Wrong password.");
        }

        return resolve({ data: user });
      }

      return reject("User not found.");
    }, 500);
}
