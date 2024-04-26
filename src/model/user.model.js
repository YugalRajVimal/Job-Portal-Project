export default class UserModel{
    constructor(id,name,email,password){
        this._id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    //Add new User (Recruiter)
    static addUser(name,email,password){
        const newUser = new UserModel(users.length+1,name,email,password);
        users.push(newUser);
        console.log(users);
        return newUser;
    }

    //Validate User
    static validateUser(email,password){
        const result = users.find(u=>u.email==email&&u.password==password);
        return result;
    }
    
}

   

var users = [];

users.push(new UserModel(1,"Abc","abc@gmail.com","abc"));
users.push(new UserModel(2,"Xyz","xyz@gmail.com","xyz"));
users.push(new UserModel(3,"Mno","mno@gmail.com","mno"));

