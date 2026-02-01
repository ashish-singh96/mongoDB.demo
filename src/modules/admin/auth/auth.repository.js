import AdminProfile from "./auth.model.js";

class AuthRepository {

    async create(data){
        try {
            const insertQuery = await AdminProfile.create({
                 fullName: data.fullName,
                 email: data.email,
                 password: data.password
            });
            return insertQuery;
        } catch (error) {
            console.log( "error in creating admin", error );
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const findQuery = await AdminProfile.findOne({email});
            return findQuery;
        } catch (error) {
            console.log("error in finding admin by email", error);
            throw error;
        }
    }

}

export const adminRepository = new AuthRepository();