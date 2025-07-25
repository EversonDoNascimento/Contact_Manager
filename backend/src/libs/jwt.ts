import jwt from "jsonwebtoken";

export const createJWT = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
