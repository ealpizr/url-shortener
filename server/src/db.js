import mongoose from "mongoose";

export default {
  connect: (uri, cb) => {
    const connect = () => {
      mongoose
        .connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("connected successfully to mongo");
          if (cb) cb();
        })
        .catch(e => {
          console.log("could not connect to mongo");
          console.log(e.message);
          console.log("retrying in 10 seconds... \n");
          setTimeout(() => connect(), 10000);
        });
    };
    connect();
  },
};
