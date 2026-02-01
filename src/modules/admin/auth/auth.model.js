import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isActive:{type:Boolean, default:true},
    status:{type:String, enum:['active','inactive'], default:'active'},
    addedBy:{type:mongoose.Types.ObjectId},
    modifiedBy:{type:mongoose.Types.ObjectId},
    addedDate:{type:Date, default:Date.now},
    modifiedDate:{type:Date, default:Date.now}
});

const AdminProfile = mongoose.model("admin_profile", adminProfileSchema);
export default AdminProfile;