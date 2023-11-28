const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log(path.resolve(__dirname, '../../public/Images'));
      cb(null, path.resolve(__dirname, '../../public/Images'))

    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload