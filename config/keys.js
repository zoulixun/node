module.exports = {
    mongoURI:"mongodb+srv://zoulixun:zoulixun123@cluster0-kcs6b.mongodb.net/Users?retryWrites=true&w=majority",
    secretOrKey:"secret"
}

//URI中Users表示芒果数据库中的数据库的名字，如果定义一个新的名字（芒果中中不存在），则相当于在芒果数据库中新建了一个数据库，如果芒果中已存在，则是要访问该数据库