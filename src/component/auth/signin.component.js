const {User} = require('../../model/model.js').default;
const { comparePassword } = require('../../utili/bcrypt.js').default;
const { generateToken } = require('../../middleware/jwt.js').default;

const signin = async (req, res) => {
    
try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
 const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const { token, refreshToken } = generateToken(user);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   res.status(201).json({ message: 'User signedin successfully', token, user: { fullName, email, phone, role } });

}catch(e){
    res.status(500).json({ message: error.message });
}

}
