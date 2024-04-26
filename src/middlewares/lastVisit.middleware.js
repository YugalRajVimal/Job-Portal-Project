export const setLastVisit=(req,res,next)=>{
    if(req.cookies.lastVisit){
        req.session.lastVisit = req.cookies.lastVisit;
    }

    res.cookie(
        "lastVisit",
        new Date().toISOString(),
        {
            maxAge:2*24*60*60*1000
        }
    );

    next();
}