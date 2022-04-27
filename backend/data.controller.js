const pool = require ("./pool")

const getData = (req, res) =>{
    pool.query("SELECT * FROM Types", function(err, data){
        if(err) return console.log(err);
        res.json(data)
    })
}

const getClasses = (req, res) => {
    pool.query(`CALL Choose_Classes`, function(err, data){
        if(err) return console.log(err);
        data = data[0].map(el => {
            return {
                num: el.Class_num,
                description: el.Class_name
            }
        })
        res.json(data)
    })
}

const getSubclasses = (req, res) => {
    pool.query(`CALL Choose_SubClasses`, function(err, data){
        if(err) return console.log(err);
        //console.log(data[0])
        data = data[0].map(el => {
            return {
                num: el.subclass_id,
                description: el.subclass_name
            }
        })
        res.json(data)
    })
}

const getGroups = (req, res) => {
    pool.query(`CALL Choose_Groups`, function(err, data){
        if(err) return console.log(err);
        data = data[0].map(el => {
            return {
                num: el.group_id,
                description: el.group_name
            }
        })
        res.json(data)
    })
}

const getSubgroups = (req, res) => {
    pool.query(`CALL Choose_SubGroups`, function(err, data){
        if(err) return console.log(err);
        data = data[0].map(el => {
            return {
                num: el.subroup_id,
                description: el.subroup_name
            }
        })
        res.json(data)
    })
}

const getTypes = (req, res) => {
    pool.query(`CALL Choose_Types`, function(err, data){
        if(err) return console.log(err);
        data = data[0].map(el => {
            return {
                num: el.type_id,
                description: el.type_name,
                urn: el.forge_urn,
                pictureLink: el.picture
            }
        })
        res.json(data)
    })
}

const getUsers = (req, res) => {
    pool.query("SELECT * FROM Users", function(err, data){
        if(err) return console.log(err);
        res.json(data)
    })
}

module.exports = {
    getData,
    getClasses,
    getGroups,
    getSubclasses,
    getSubgroups,
    getTypes,
    getUsers
}