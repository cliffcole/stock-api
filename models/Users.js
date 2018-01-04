
const users  = (sequelize, DataTypes) => {
    let Users = sequelize.define('Users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
    })
    /* Users.associate = () => {

    } */
    //console.log(Users);
    return Users;
}

module.exports = users;
