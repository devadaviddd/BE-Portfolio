interface JWTConfig {
  secretKeyOfAccessToken: string;
  secretKeyOfIdToken: string;
  expiresIn: string;
}

export const jwtConfig: JWTConfig = {
  secretKeyOfAccessToken: process.env.JWT_SECRET_ACCESS ?? '123',
  secretKeyOfIdToken: process.env.JWT_SECRET_ID ?? '345',
  expiresIn: process.env.JWT_EXPIRE ?? '30',
};