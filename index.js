// const express = require('express');
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//     res.write("<script>alert('testtest')</script>");
//     // res.send("내옆에 귀여운거 있다");
// })

// app.get("/beauty", (req, res) => {
//     res.send("뷰티용품 페이지 입니다 라고 해오라고 했음");
// })

// app.get("/dajung", (req, res) => {
//     res.sendFile(__dirname + '/main.html');
// })

// app.listen(port, () => {
//     console.log("dajung yee cute");
// });

// const request = require('request');
// const cheerio = require('cheerio');

// const url = 'https://www.coupang.com/vp/products/6627119412?isAddedCart=';

// request(url, (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     const ogp = {
//       title: $('meta[property="og:title"]').attr('content'),
//       description: $('meta[property="og:description"]').attr('content'),
//       image: $('meta[property="og:image"]').attr('content')
//     };
//     console.log(ogp);
//   }
// });


const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/ogp', (req, res) => {
  const url = 'https://www.coupang.com/vp/products/6627119412?isAddedCart=';
  console.log("1");
  request(url, (error, response, html) => {
    console.log("2");
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const ogp = {
        title: $('meta[property="og:title"]').attr('content'),
        description: $('meta[property="og:description"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content')
      };
      res.send(`
        <html>
          <head>
            <meta property="og:title" content="${ogp.title}">
            <meta property="og:description" content="${ogp.description}">
            <meta property="og:image" content="${ogp.image}">
          </head>
          <body>
            <h1>OGP Information</h1>
            <p>Title: ${ogp.title}</p>
            <p>Description: ${ogp.description}</p>
            <p>Image: ${ogp.image}</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});