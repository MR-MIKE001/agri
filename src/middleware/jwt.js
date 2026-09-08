import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;
import { config } from "dotenv";
config();

export const generateToken=(user)=>{
    const token=sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'24h'});
    const refreshToken=sign({id:user._id,role:user.role},process.env.JWT_REFRESH_SECRET,{expiresIn:'7d'});
    return { token, refreshToken };
}

export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization||req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Access denied. No token provided.'});
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:'Invalid token.'});
    }
}
export const verifyRefreshToken=(req,res,next)=>{
    const refreshToken=req.headers.authorization?.split(' ')[1]||req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:'Access denied. No refresh token provided.'});
    }
    try {
        const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:'Invalid refresh token.'});
    }
}
