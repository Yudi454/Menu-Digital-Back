const moongose = require("mongoose");

const uri = process.env.URI;

const conectDb = async () => {
  try {
    await moongose.connect(`${uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        j: true, // Journal acknowledgment
        wtimeout: 1000,
      },
    });
    console.log("Database connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectDb