const request = require('request');
const jsSHA = require('jssha');

exports.payU = async (req, res) => {
  res.render('payUMoney');
};
exports.payUMoney = async (req, res) => {
  console.log(req.body);
  const obj = {
    amount      : 1000,
    productinfo : '23',
    firstname   : 'sagar',
    email       : 'javiya@gmail.com',
    phone       : '6789033434',
    txnid       : 'kjdh',
  };
  // req.body.txnid = '2uyt98'//Here pass txnid and it should be different

  //Here save all the details in pay object
  const pay = obj;
  const hashString =
    'gtKFFx' + //store in in different file
    '|' +
    pay.txnid +
    '|' +
    pay.amount +
    '|' +
    pay.productinfo +
    '|' +
    pay.firstname +
    '|' +
    pay.email +
    '|' +
    '||||||||||' +
    'eCwWELxi'; //store in in different file
  const sha = new jsSHA('SHA-512', 'TEXT');
  sha.update(hashString);
  //Getting hashed value from sha module
  const hash = sha.getHash('HEX');

  //We have to additionally pass merchant key to API

  pay.key  = 'gtKFFx'; //store in in different file;
  pay.surl = 'PROVIDE SUCCESS URL ROUTE';
  pay.furl = 'PROVIDE FAILRE URL ROUTE';
  pay.hash = hash;
  //Making an HTTP/HTTPS call with request
  request.post(
    {
      headers: {
        Accept         : 'application/json',
        'Content-Type' : 'application/json',
      },
      url: 'https://sandboxsecure.payu.in/_payment', //Testing url
      form: pay,
    },
    function (error, httpRes, body) {
      if (error)
        res.send({
          status: false,
          message: error.toString(),
        });
      if (httpRes.statusCode === 200) {
        res.send(body);
      } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
      }
    }
  );
};
