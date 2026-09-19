const getCurrentUser = () =>{
    const user = localStorage.getItem("user");
    if(user){
        return JsonWebTokenError.parse(user);

    }else{
        return null;
    }
};
export {getCurrentUser};