import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

        const { name, email, password } = req.body;
        //validate
        if(!name){
            next("Name is required");
        }
        if(!email){
            next("Email is required");
        }
        if(!password){
            next("Password is required");
        }

        //check if user exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            next("User already exists please login");
        }
        const user = await userModel.create({name, email, password});

        //token
        const token = user.createJWT();
        res.status(201).send({
            success:true,
            message: 'user created successfully',
            user : {
                user:user.name,
                lastName:user.lastName,
                email:user.email,
                location:user.location,
            },
        token
    });      
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if(!email || !password){
        next("Please provide all fields");
    }
    //check if user exists
    const user= await userModel.findOne({email}).select('+password');
    if(!user){
        next("Invalid credentials");
    }
    //compare password
    const isMatch = await user.matchPassword(password); 
    if(!isMatch){
        next("Invalid credentials");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.send({
        success:true,
        message: 'user logged in successfully',
        user,
        token
    });
}