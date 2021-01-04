const express = require('express');
const axios = require('axios');
const { head } = require('../app');
const router = express.Router();

const CITY_MAP = {
  基隆市: 'http://cwms.cityweb.com.tw/cwmsopendata/cwms.xml',
  臺北市: 'http://cwms.tp.gov.taipei/cwmsopendata/cwms.xml',
  新北市: 'http://cwms.epd.ntpc.gov.tw/cwmsopendata/cwms.xml',
  桃園市: 'http://cwms.tydep.gov.tw/cwmsopendata/cwms.xml',
  新竹縣: 'http://hsinchuauto.tk/cwmsopendata/cwms.xml',
  新竹市: 'http://cwms.hccepb.gov.tw/cwmsopendata/cwms.xml',
  苗栗縣: 'http://cwms.mlepb.gov.tw/cwmsopendata/cwms.xml',
  臺中市: 'http://cwms.epb.taichung.gov.tw/cwmsopendata/cwms.xml',
  彰化縣: 'http://cwms-n.chepb.gov.tw/cwmsopendata/cwms.xml',
  南投縣: 'http://ntwater.ntepb.gov.tw/cwmsopendata/cwms.xml',
  雲林縣: 'http://yunlincwms.ylepb.gov.tw/cwmsopendata/cwms.xml',
  嘉義縣: 'http://cwms.cyepb.gov.tw/cwmsopendata/cwms.xml',
  臺南市: 'http://cwms.tnepb.gov.tw/cwmsopendata/cwms.xml',
  高雄市: 'http://cwms.ksepb.gov.tw/cwmsopendata/cwms.xml',
  屏東縣: 'http://cwms.ptepb.gov.tw/cwmsopendata/cwms.xml',
  宜蘭縣: 'http://cwms.ilepb.gov.tw/cwmsopendata/cwms.xml',
  花蓮縣: 'http://cwms.hlepb.gov.tw/cwmsopendata/cwms.xml',
  臺東縣: 'http://cwms.ttepb.gov.tw/cwmsopendata/cwms.xml',
  澎湖縣: 'http://cwms.phepb.gov.tw/cwmsopendata/cwms.xml',
  金門縣: 'http://cwms.kepb.gov.tw/cwmsopendata/cwms.xml',
  連江縣: 'http://water.mw.com.tw/cwmsopendata/cwms.xml'
}

/* GET home page. */
router.get('/:city', async function(req, res, next) {
  const url = CITY_MAP[req.params.city]
  if (!url) {
    res.status(404);
    res.render('error', {
      message: 'City not existed',
      error: {
        status: 404
      }
    });
    return
  }
  let resp = null
  try {
    resp = await axios.get(url)
  } catch (error) {
    res.status(500)
    res.render('error', {
      message: error.message,
      error
    })
    return
  }
  const headers = resp.headers
  Object.keys(headers).forEach((header) => {
      res.set(header, headers[header])
  })
  res.send(resp.data)
});

module.exports = router;
