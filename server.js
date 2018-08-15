const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>text.toUpperCase());

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    let now = new Date().toLocaleString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    console.log(log);
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle:'Maintenance',
//         welcome:"We'll be back soon"
//     });
// })
hbs.registerPartials(__dirname+'/views/partials');
// app.get('/',(req,res)=>{
// //    res.send("<H1>Hello express</h1>");
//    res.send({
//        name:'Ivan',
//        like:[
//            'Hiking',
//            'Learning',
//            'Anal sex'
//        ]
//    })
// });

// app.get('/about',(req,res)=>{
//     res.send('About page');
// })
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcome:"Welcome to my site"
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
       
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        error:"Bad request",
    });
})
app.listen(3000,()=>console.log("Server is up on port 3000"));