type CheckinType = {
  anonymous: boolean;
  users: {
    email: string;
  };
};

export const userName = (checkin: CheckinType) => {
  if (checkin.anonymous) return "Anonymous";
  const email = checkin.users?.email.split("@");
  if (email) {
    return email[0];
  }
  return "Unknown";
};
