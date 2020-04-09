//config o server
const express = require("express");
const server = express();

//config o server para expor arquivos estáticos
server.use(express.static('public'));

//habilitar boody do form
server.use(express.urlencoded({ extended: true }));

//config conexão do DB
const Pool = require('pg').Pool;
const db = new Pool({
    user:'',
    password:'',
    host: '',
    port: ,
    database: ''
});

//config a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});

// let tot = 0;
// db.query("SELECT COUNT(blood) FROM donors", (err, res) => {
//     if(err){
//         console.log(err);
//     }else{
//         tot = (res.rows[0].count).value;
//         //console.log(total) // Hello World!
//         db.end();

//     } 
// })

//config da apresentação da página
server.get("/", function(req, res){
    db.query("SELECT COUNT(blood) FROM donors", function(err, result1){
        if(err){
            return res.send("Erro01 do banco de dados");
        } else{
            const total_donors = result1.rows[0].count;
            db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'A+'", function(err, result2){
                if(err){
                    return console.log("Erro02 do banco de dados");
                }else{
                    const Apositivo = result2.rows[0].count;
                    let porcent1 = (Apositivo * 100)/total_donors;
                    db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'A-'", function(err, result2){
                        if(err){
                            return console.log("Erro03 do banco de dados");
                        }else{
                            const Anegativo = result2.rows[0].count;
                            let porcent2 = (Anegativo * 100)/total_donors;
                            db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'B+'", function(err, result2){
                                if(err){
                                    return console.log("Erro04 do banco de dados");
                                }else{
                                    const Bpositivo = result2.rows[0].count;
                                    let porcent3 = (Bpositivo * 100)/total_donors;
                                    db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'B-'", function(err, result2){
                                        if(err){
                                            return console.log("Erro05 do banco de dados");
                                        }else{
                                            const Bnegativo = result2.rows[0].count;
                                            let porcent4 = (Bnegativo * 100)/total_donors;
                                            db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'O+'", function(err, result2){
                                                if(err){
                                                    return console.log("Erro06 do banco de dados");
                                                }else{
                                                    const Opositivo = result2.rows[0].count;
                                                    let porcent5 = (Opositivo * 100)/total_donors;
                                                    db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'O-'", function(err, result2){
                                                        if(err){
                                                            return console.log("Erro07 do banco de dados");
                                                        }else{
                                                            const Onegativo = result2.rows[0].count;
                                                            let porcent6 = (Onegativo * 100)/total_donors;
                                                            db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'AB+'", function(err, result2){
                                                                if(err){
                                                                    return console.log("Erro08 do banco de dados");
                                                                }else{
                                                                    const ABpositivo = result2.rows[0].count;
                                                                    let porcent7 = (ABpositivo * 100)/total_donors;
                                                                    db.query("SELECT COUNT(blood) FROM donors WHERE blood = 'AB-'", function(err, result2){
                                                                        if(err){
                                                                            return console.log("Erro09 do banco de dados");
                                                                        }else{
                                                                            const ABnegativo = result2.rows[0].count;
                                                                            let porcent8 = (ABnegativo * 100)/total_donors;
                                                                            let sangue = [porcent1, porcent2, porcent3, porcent4, porcent5, porcent6, porcent7, porcent8];
                                                                            return res.render("index.html", {sangue});
                                                                        } 
                                                                    })
                                                            
                                                                } 
                                                            })
                                                    
                                                        } 
                                                    })
                                            
                                                } 
                                            })
                        
                                        } 
                                    })
                
                                } 
                            })
        
                        } 
                    })

                } 
            })
        }
    })
});

//pegando os dados do form
server.post("/",function(req, res){
    const name = req.body.name.toUpperCase();
    const email = req.body.email;
    const blood = req.body.blood.toUpperCase();

    console.log(name);
    console.log(email);
    console.log(blood);

    if(name == "" || email == "" || blood == ""){
        return res.send("Preencha todos os dados");
    }

    if(blood != "A+" && 
       blood != "A-" && 
       blood != "B+" && 
       blood != "B-" && 
       blood != "O+" && 
       blood != "O-" && 
       blood != "AB+" && 
       blood != "AB-"){
            return res.send("Tipo sanguineo inesistente");
    }
    //inserindo noBD
    const query = `INSERT INTO donors ("name","email","blood") VALUES($1, $2, $3)`
        db.query(query, [name, email, blood], function(err){
            if(err){
                console.log(err);
                return res.send("Erro no danco de dados");
            } 
            return res.redirect("/");
        });
});

//ligar o server e permitir o acesso a porta 3000
server.listen(3333, function(){
    console.log("iniciei o server");
});
