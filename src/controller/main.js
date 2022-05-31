
const login = (req,res) =>{
    console.log(req.body);
    const {username,password} = req.body;
    if(!username||!password){
        res.status(500).json({msg:"err"});
    }
    res.send("fake login register ...");
}

const dashboard =  (req,res) =>{
    res.status(200).send("dashboad ...");
}



module.exports = {
    login,
    dashboard, 
}