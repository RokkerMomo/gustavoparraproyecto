import { Model, Schema, Document, model, models } from "mongoose";
import bcrypt from 'bcrypt'

//INTERFACE
export interface IUser extends Document {
    email:string,
    password:string,
    name:string,
    document:string,
    role:{
        type:string,
        default:'user',
        enum:['user','admin']
    }
    comparePassword:(p: object) => Response
}

//EL ESQUEMA DE USUARIO
const UserSchema = new Schema ({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        required:true
    },
    document:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    }
});




UserSchema.pre<IUser>('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
    //ENCRIPTAR CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();

})


//COMPARAR CONTRASEÑAS ENCRIPTADAS
UserSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };


const User = models.User || model<IUser>('usuarios', UserSchema);
export default User;