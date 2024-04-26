export default class ApplicantModel{
    constructor(id,name,email,contact,resume){
        this._id=id;
        this.name=name;
        this.email=email;
        this.contact=contact;
        this.resume=resume;
    }

    getAllApplicants(){
        return applicants;
    }
}

