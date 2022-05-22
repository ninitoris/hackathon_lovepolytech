const pool = require ("./pool")
const auth = require("./auth.controller");
const jwt = require('jsonwebtoken');


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

//найти запись в таблицах по введенному коду
const getCode = (req, res, next) =>{
    code = req.body.code;
    switch (code.length){
        case (0): {return undefined; break}
        case (1): {return undefined; break}
        case (2): {
            pool.query(
                `SELECT * FROM Classes WHERE Class_num = ${code}`, 
                (err, result) => {
                    if(err){
                        return res.json ({message: 'Query error: ' + err})
                    }
                    if(result){
                        if(result[0] == null || result[0] == undefined){
                            //not found class in table
                            return res.send({error: true, message: 'no class found'})
                            
                        }else {
                            //class was found in table
                            return res.json (result[0])
                        }
                    }else 
                    return res.status(500).send({message: 'result is undefined' })
                }
            )
            break
        }
        case (3):{
            pool.query(
                `SELECT * FROM Subclasses WHERE subclass_id = ${code}`, 
                (err, result) => {
                    if(err){
                        return res.json ({message: 'Query error: ' + err})
                    }
                    if(result){
                        if(result[0] == null || result[0] == undefined){
                            //not found class in table
                            return res.send({error: true, message: 'no class found'})
                            
                        }else {
                            //class was found in table
                            return res.json (result[0])
                        }
                    }else 
                    return res.status(500).send({message: 'result is undefined' })
                }
            )
            break
        }
        case (4):{
            pool.query(
                `SELECT * FROM Groups WHERE group_id = ${code}`, 
                (err, result) => {
                    if(err){
                        return res.json ({message: 'Query error: ' + err})
                    }
                    if(result){
                        if(result[0] == null || result[0] == undefined){
                            //not found class in table
                            return res.send({error: true, message: 'no class found'})
                            
                        }else {
                            //class was found in table
                            return res.json (result[0])
                        }
                    }else 
                    return res.status(500).send({message: 'result is undefined' })
                }
            )
            break
        }
        case (5):{
            pool.query(
                `SELECT * FROM Subgroup WHERE subroup_id = ${code}`, 
                (err, result) => {
                    if(err){
                        return res.json ({message: 'Query error: ' + err})
                    }
                    if(result){
                        if(result[0] == null || result[0] == undefined){
                            //not found class in table
                            return res.send({error: true, message: 'no class found'})
                            
                        }else {
                            //class was found in table
                            return res.json (result[0])
                        }
                    }else 
                    return res.status(500).send({message: 'result is undefined' })
                }
            )
            break
        }
        case (6):{
            pool.query(
                `SELECT * FROM Types WHERE type_id = ${code}`, 
                (err, result) => {
                    if(err){
                        return res.json ({message: 'Query error: ' + err})
                    }
                    if(result){
                        if(result[0] == null || result[0] == undefined){
                            //not found class in table
                            return res.send({error: true, message: 'code not found'})
                            
                        }else {
                            //class was found in table
                            return res.json (result[0])
                        }
                    }else 
                    return res.status(500).send({message: 'result is undefined' })
                }
            )
            break
        }
        default: {return undefined; break}
        
    }
}


const addClass = (req, res, next) =>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `SELECT * FROM Classes WHERE Class_num = ${class_id}`, 
        (err, result) => {
            if(err){
                return res.json ({message: 'Query error: ' + err})
                
            }
            if(result){

                if(result[0] == null || result[0] == undefined){
                    //not found class in table
                    // return res.send({error: true, message: 'no class found'})
                    //add class to table
                    pool.query(
                        `call Insert_Classes (${class_id}, ${pool.escape(class_desc)})`
                        ,
                        (err, result) =>{
                            if (err){
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'Класс ' + class_id + ' успешно добавлен'
                            });
                        }
                    )
                }else {
                    return res.json (result[0])
                }
            }else 
            return res.status(500).send({message: 'result is undefined' })
        }
    )
}


const addSubClass = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `SELECT * FROM Subclasses WHERE subclass_id = ${class_id}`, 
        (err, result) => {
            if(err){
                return res.json ({message: 'Query error: ' + err})
                
            }
            if(result){
                if(result[0] == null || result[0] == undefined){
                    var parent_id = class_id.toString().substring(0, 2)
                    pool.query(
                        //`CALL Update_Subclasses(${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`
                        `call Insert_Subclasses(${class_id}, ${pool.escape(class_desc)},${parent_id})`
                        ,(err, result) =>{
                            if (err){
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'Класс ' + class_id + ' успешно добавлен в Subclasses'
                            });
                        }
                    )
                }else {
                    return res.json (result[0])
                }
            }else 
            return res.status(500).send({message: 'result is undefined' })
        }
    )

}

const addGroup = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `SELECT * FROM Groups WHERE group_id = ${class_id}`, 
        (err, result) => {
            if(err){
                return res.json ({message: 'Query error: ' + err})
                
            }
            if(result){
                if(result[0] == null || result[0] == undefined){
                    var parent_id = class_id.toString().substring(0, 3)
                    pool.query(
                        //`CALL Update_Subclasses(${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`
                        `call Insert_Group(${class_id}, ${pool.escape(class_desc)},${parent_id})`
                        ,(err, result) =>{
                            if (err){
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'Класс ' + class_id + ' успешно добавлен в Groups'
                            });
                        }
                    )
                }else {
                    return res.json (result[0])
                }
            }else 
            return res.status(500).send({message: 'result is undefined' })
        }
    )
}

const addSubGroup = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `SELECT * FROM Subgroup WHERE subroup_id = ${class_id}`, 
        (err, result) => {
            if(err){
                return res.json ({message: 'Query error: ' + err})
                
            }
            if(result){
                if(result[0] == null || result[0] == undefined){
                    var parent_id = class_id.toString().substring(0, 4)
                    pool.query(
                        //`CALL Update_Subclasses(${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`
                        `call Insert_SubGroup(${class_id}, ${pool.escape(class_desc)},${parent_id})`
                        ,(err, result) =>{
                            if (err){
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'Класс ' + class_id + ' успешно добавлен в SubGroups'
                            });
                        }
                    )
                }else {
                    return res.json (result[0])
                }
            }else 
            return res.status(500).send({message: 'result is undefined' })
        }
    )
}

const addType = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `SELECT * FROM Types WHERE type_id = ${class_id}`, 
        (err, result) => {
            if(err){
                return res.json ({message: 'Query error: ' + err})
                
            }
            if(result){
                if(result[0] == null || result[0] == undefined){
                    var parent_id = class_id.toString().substring(0, 5)
                    urn_p = req.body.urn;
                    var picture_url = req.body.picture
                    var model_p = class_id + '.ipt'
                    pool.query(
                        //`CALL Update_Subclasses(${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`
                        `call Insert_Types1(${class_id}, ${pool.escape(class_desc)},${parent_id},${pool.escape(urn_p)}, ${pool.escape (picture_url)},${pool.escape (model_p)})`
                        ,(err, result) =>{
                            if (err){
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'Класс ' + class_id + ' успешно добавлен в types'
                            });
                        }
                    )
                }else {
                    return res.json (result[0])
                }
            }else 
            return res.status(500).send({message: 'result is undefined' })
        }
    )
}


const addCode = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    switch (class_id.length){
        case (2):{
            res.send(404).json({message: 'you are using old method'})
            break
        }
        case (3):{
            //3 digits = Subclasses
            res.send(404).json({message: 'you are using old method'})
            break
        }
        case (4):{
            //4 digits = group
            res.send(404).json({message: 'you are using old method'})
            break
        }
        case (5):{
            //5 digits = subgroup
            res.send(404).json({message: 'you are using old method'})
            break
        }
        case (6):{
            //6 digits = type
            res.send(404).json({message: 'you are using old method'})
            break
        }
    }
    
}


const updateClasses = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    pool.query(
        `CALL Update_Classes (${class_id},${class_id},${pool.escape(class_desc)})`,
        (err, result) =>{
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'Класс ' + class_id + ' успешно обновлен'
            });
        }
    )
}

const updateSubClasses = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    var parent_id = class_id.toString().substring(0, 2)
    pool.query(
        `CALL Update_SubClasses (${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`,
        (err, result) =>{
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'Класс ' + class_id + ' успешно обновлен'
            });
        }
    )
}

const updateGroups = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    var parent_id = class_id.toString().substring(0, 3)
    pool.query(
        `CALL Update_Groups (${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`,
        (err, result) =>{
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'Класс ' + class_id + ' успешно обновлен'
            });
        }
    )
}

const updateSubGroups = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    var parent_id = class_id.toString().substring(0, 4)
    pool.query(
        `CALL Update_SubGroups (${class_id},${pool.escape(class_desc)},${class_id},${parent_id})`,
        (err, result) =>{
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'Класс ' + class_id + ' успешно обновлен'
            });
        }
    )
}

const updateTypes = (req, res, next)=>{
    class_id = req.body.class;
    class_desc = req.body.description;
    var parent_id = class_id.toString().substring(0, 5)
    urn = req.body.urn;
    var picture_url = req.body.picture
    var model_p = 'хз_че'
    pool.query(
        `CALL Update_Types (${class_id},${pool.escape(class_desc)},${class_id},${parent_id},)`,
        (err, result) =>{
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'Класс ' + class_id + ' успешно обновлен'
            });
        }
    )
}

const writeFavourites = (req, res, next)=>{
    login = req.body.login
    favs = req.body.favs
    pool.query(
        `INSERT INTO Favouite (login, favourite_list) VALUES (${pool.escape(login)}, ${pool.escape(favs)})`
        ,(err, result) => {
            if (err) {
                                    
                return res.status(400).send({
                    msg: err
                });
            }
            return res.status(201).send({
                msg: 'added'
            });
        }
    )
}

const updateFavourites = (req, res, next)=>{

    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({
            message: "Did not get token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    try{
        var decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    }catch (err){
        return res.status(401).json({
            message:"Unable to verify token"
        })
    }

    login = req.body.login
    favs = req.body.favs
    pool.query(
        `SELECT * FROM Favouite WHERE login=${pool.escape(login)}`
        ,(err, result) => {
            if (err){
                return res.status(400).send({
                    msg: err
                }); 
            }
            if(result[0] == null || result[0] == undefined){
                pool.query(
                    `INSERT INTO Favouite (login, favourite_list) VALUES (${pool.escape(login)}, ${pool.escape(favs)})`
                    ,(err, result) => {
                        if (err) {
                                                
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        return res.status(201).send({
                            msg: 'updated favs'
                        });
                    }
                )
            }else{
                pool.query(
                    `UPDATE Favouite SET favourite_list = ${pool.escape(favs)} WHERE login=${pool.escape(login)}`
                    ,(err, result) => {
                        if (err) {
                                                
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        return res.status(201).send({
                            msg: 'updated favs'
                        });
                    }
                )
            }
        }
    )
    
}

const getFavourites = (req, res, next)=>{
    
    pool.query(`SELECT favourite_list from Favouite WHERE login=${pool.escape(req.body.login)}`
    , function(err, data){
        if(err) res.status(400).send({msg: err});
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
    getUsers,
    addCode,
    getCode,
    updateClasses,
    updateSubClasses,
    updateGroups,
    updateSubGroups,
    addClass,
    addSubClass,
    addGroup,
    addSubGroup,
    addType,
    writeFavourites,
    updateFavourites,
    getFavourites
}