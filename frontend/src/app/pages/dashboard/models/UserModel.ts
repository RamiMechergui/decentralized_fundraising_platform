export interface UserModel {
    _id:string;
    id:string;
    userName:string;
    email:string;
    password:string;
    userType:string;
    role:string;
    createdBy:string;
    verified:number;
    twoFactorEnabled:number;
    address:string;
    status:string;
    isDeleted:number;

}