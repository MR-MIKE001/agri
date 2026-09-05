import { genSalt, hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
}

