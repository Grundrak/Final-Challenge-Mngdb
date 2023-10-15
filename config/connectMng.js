const mongoose = require('mongoose')
require('dotenv').config();

    mongoose.connect(process.env.URL)
    .then(() => {
        console.log("Mbrouk rak connect m3a MongoDB");
      }) .catch(err => {
        console.error("Wa s9a3 chooof ach drti", err);
      });


