export const CheckExpire = (timestamp: number) => {
  const now = new Date();
  const expire = new Date(timestamp * 1000);
  if (now > expire) return true;
  return false;
};
