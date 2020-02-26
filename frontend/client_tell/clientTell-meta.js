const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const host = '127.0.0.1';
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const config = require('./src/config/config.json');
const https = require('https');
const localapi = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;
const CryptoJS = require("crypto-js");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get("/", async(req, res) => {
  try {
    const user = await axios.get(localapi+"/user/me", {
      headers:req.headers
    });

    return res.redirect("/Home-Page");
  } catch (err) {
    return res.redirect("/Landing-Page")
  }
});

app.get('/courses/:category/:title/:page',function (request,response) {
  let name = request.params.title;
  let page = request.params.page;
  let val = name.replace(/-/g," ");
  console.log(val);
  let objective;
  let imagePrev;


  function getDescd(){
    return promise = new Promise(function (resolve, reject) {

      try{

        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = response.data.content.objective;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })

      }catch (err) {
        console.log(err);
      }

    })
  }

  function getImages(){
    return promise = new Promise(function (resolve,reject) {
      try{
        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = config.domain+"/images/"+response.data.content.displayImage;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })
      }catch (err) {
        console.log(err)
      }
    })
  }

  async function fillDesc() {
    objective = await getDescd().catch(err => {console.log(err)});
    imagePrev = await getImages().catch(err => {console.log(err)});

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });

        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, objective ? val +" page "+ page : "Trimegah eLearning");
      data = data.replace(/\$OG_DESCRIPTION/g, objective ? objective : "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, imagePrev ? imagePrev : "https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg");
      response.send(result);
    });
  }

  fillDesc();


});

app.get('/podcast/:category/:title/:page',function (request,response) {
  let name = request.params.title;
  let page = request.params.page;
  let val = name.replace(/-/g," ");
  console.log(val);
  let objective;
  let imagePrev;


  function getDescd(){
    return promise = new Promise(function (resolve, reject) {
      try {
        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = response.data.content.objective;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })

      } catch (err) {
        console.log(err);
      }

    })
  }

  function getImages(){
    return promise = new Promise(function (resolve,reject) {
      try{
        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = config.domain+"/images/"+response.data.content.displayImage;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })
      }catch (err) {
        console.log(err)
      }
    })
  }

  async function fillDesc() {
    objective = await getDescd().catch(err => {console.log(err)});
    imagePrev = await getImages().catch(err => {console.log(err)});

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });

        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, objective ? val +" page "+ page : "Trimegah eLearning");
      data = data.replace(/\$OG_DESCRIPTION/g, objective ? objective : "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, imagePrev ? imagePrev : "https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg");
      response.send(result);
    });
  }

  fillDesc();


});

app.get('/courses/:category/:title',function (request,response) {
  let name = request.params.title;
  let val = name.replace(/-/g," ");

  let objective;
  let imagePrev;


  function getDescd(){
    return promise = new Promise(function (resolve, reject) {

      try {

        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            if(config.env === 'production') {
              var bytes  = CryptoJS.AES.decrypt(response.data.content, config.keyEncrypt);
              response.data.content = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }

            // handle success
            let data = response.data.content.objective;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })

      } catch (err) {
        console.log(err);
      }

    })
  }

  function getImages(){
    return promise = new Promise(function (resolve,reject) {
      try{
        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            if(config.env === 'production') {
              var bytes  = CryptoJS.AES.decrypt(response.data.content, config.keyEncrypt);
              response.data.content = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            // handle success
            let data = config.domain+"/images/"+response.data.content.displayImage;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })
      }catch (err) {
        console.log(err)
      }
    })
  }

  async function fillDesc() {
    objective = await getDescd().catch(err => {console.log(err)});
    imagePrev = await getImages().catch(err => {console.log(err)});

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, objective ? val : "Trimegah eLearning");
      data = data.replace(/\$OG_DESCRIPTION/g, objective ? objective : "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, imagePrev ? imagePrev : "https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg");
      response.send(result);
    });
  }

  fillDesc();


});

app.get('/podcast/:category/:title',function (request,response) {
  let name = request.params.title;
  let val = name.replace(/-/g," ");
  console.log(val);
  let objective;
  let imagePrev;


  function getDescd(){
    return promise = new Promise(function (resolve, reject) {

      try{

        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = response.data.content.objective;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })

      }catch (err) {
        console.log(err);
      }

    })
  }

  function getImages(){
    return promise = new Promise(function (resolve,reject) {
      try{
        axios.get(localapi+"/coursetitle/"+val)
          .then(function (response) {
            // handle success
            let data = config.domain+"/images/"+response.data.content.displayImage;
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })
      }catch (err) {
        console.log(err)
      }
    })
  }

  async function fillDesc() {
    objective = await getDescd().catch(err => {console.log(err)});
    imagePrev = await getImages().catch(err => {console.log(err)});

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, objective ? val : "Trimegah eLearning");
      data = data.replace(/\$OG_DESCRIPTION/g, objective ? objective : "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, imagePrev ? imagePrev : "https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg");
      response.send(result);
    });
  }

  fillDesc();


});

app.get('/category/:name', function (request,response) {
  let name = request.params.name;
  let val = name.replace(/-/g," ");
  let desc;


  function getCatDesc() {
    return promise = new Promise(function (resolve, reject) {
      try {
        axios.get(localapi+"/categoryByName/"+val)
          .then(function (response) {
            // handle success
            console.log(response.data.data.description);
            let data =  response.data.data.description
            resolve (data);
          })
          .catch(function (error) {
            // handle error
            reject(error)
          })
      }catch (err) {
        console.log(err)
      }
    })
  }

  async function fillCatDesc() {
    desc = await getCatDesc().catch(err => {console.log(err)});
    console.log("called");

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });

        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, desc ? 'Trimegah eLearning - '+ val : 'Trimegah eLearning');
      data = data.replace(/\$OG_DESCRIPTION/g, desc ? desc : "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
      response.send(result);
    });
  }

  fillCatDesc();


});

app.get('/about', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });

      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Trimegah eLearning - About Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This page will give your information about Trimegah eLearning");
    data = data.replace(/\$OG_URL/g,'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/contactus', function(request, response) {
  console.log('Contactus page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });

      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Trimegah eLearning - Contact us Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This page will give your information about Trimegah eLearning");
    data = data.replace(/\$OG_URL/g,'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/help', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });

      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Trimegah eLearning - Help Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This page will give your information about Trimegah eLearning");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/termus', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - Term of use Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of use page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/myaccount', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - My Account Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of use page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

// app.get('/myprofile', function(request, response) {
//   console.log('About page visited!');
//   const filePath = path.resolve(__dirname, './build', 'index.html');
//   fs.readFile(filePath, 'utf8', function (err,data) {
//     if (err) {
//       response.render('error.html', function(err, html) {
//         if(err){
//           return response.send("Server error");
//         }

//         response.send(html)
//       });
//       return console.log(err);
//     }
//     data = data.replace(/\$OG_TITLE/g, 'Tell - Trimegah eLearning - My Profile Page');
//     data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of use page");
//     data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
//     let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
//     response.send(result);
//   });
// });

app.get('/search', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - Search Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of search page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/myaccount', function(request, response) {
  console.log('my account page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });
      console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - My Account Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of search page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/myprofile', function(request, response) {
  console.log('my profile page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });

      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - My Profile Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of search page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/resetpassword/:token', function(request, response) {
  console.log('Reset Password!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html);
      });
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Tell - Reset Password Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of search page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/verifyemail/:id', function(request, response) {
  console.log('Verify email!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });
      
      return console.log(err);
    }

    data = data.replace(/\$OG_TITLE/g, 'Tell - Verify Email Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Trimegah eLearning Term of search page");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    response.send(result);
  });
});

app.get('/Landing-Page', function(request, response) {
  console.log('Landing Page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', async function (err,data) {
    try {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });
  
        return console.log(err);
      }

      //const user = await axios.get("http://localhost:3000/api/v1/me");
      //console.log(user)
      data = data.replace(/\$OG_TITLE/g, 'Tell - Landing Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
  
      response.send(result);
    }
    catch (err) {
      response.send(err)
    }
    
  });
});

app.get('/Home-Page', function(request, response) {
  console.log('Home Page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', async function (err,data) {
    try {
      if (err) {
        response.render('error.html', function(err, html) {
          if(err){
            return response.send("Server error");
          }
  
          response.send(html)
        });
  
        return console.log(err);
      }

      //const user = await axios.get("http://localhost:3000/api/v1/me");
      //console.log(user)
      data = data.replace(/\$OG_TITLE/g, 'Tell - Home Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "Trimegah eLearning is a website you can learn more about stock market");
      data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
      let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
  
      response.send(result);
    }
    catch (err) {
      response.send(err)
    }
    
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
  console.log("404");
  const filePath = path.resolve(__dirname, './build', '404.html');

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      response.render('error.html', function(err, html) {
        if(err){
          return response.send("Server error");
        }

        response.send(html)
      });

      return console.log(err);
    }

    data = data.replace(/\$OG_TITLE/g, 'Trimegah eLearning');
    data = data.replace(/\$OG_DESCRIPTION/g, "Trimegah eLearning is a website you can learn more about stock market");
    data = data.replace(/\$OG_URL/g, 'https://www.tell.co.id/');
    let result = data.replace(/\$OG_IMAGE/g, 'https://www.tell.co.id/images/5d0c587ec5c922b60ce87788/Tell-WA.jpg');
    res.send(result);
  })

  // res.sendFile(filePath);

});

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'), {} , function(err, data) {
//     console.log("in here");
//     return res.render('error.html', function(err, html) {
//       res.send(html);
//     });
    // if(err) {
    //   return res.render('error.html', function(err, html) {
    //     if(err){
    //       return res.send("Server error");
    //     }
    //     res.send(html)
    //   });
    // }
//   });
// });

app.listen(port,host, () => console.log(`Listening on port ${port} and host ${host}`));
