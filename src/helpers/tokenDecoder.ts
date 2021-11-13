import jwt from 'jsonwebtoken';
import { User } from '../types';

export default function DecodedToken(tokenId: string) {
    const user = jwt.decode(tokenId, { json: true }) as User;
    return user;
}
