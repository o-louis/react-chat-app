let users = [];


module.exports = {
    createUser: (name, room, id) => {
        const user = {name, room, id};
        users = [...users, user];
    },

    findUser: (id) => {
        return users.find(user => user.id === id);
    },

    deleteUser: (deletedUser) => {
        users = users.filter(user => user !== deletedUser);
    }
};