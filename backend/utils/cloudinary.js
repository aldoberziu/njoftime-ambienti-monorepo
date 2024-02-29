const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "njoftime",
  api_key: "869878118692644",
  api_secret: "33lffzWdbh__Fv02w1layQ7_-ZU",
});

const options = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  // use_filename: true,
  // unique_filename: false,
};

const upload = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (err, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.log(err.message);
      return reject({ message: err.message });
    });
  });
};
module.exports = (images) => {
  return Promise.all(images.map(upload))
};

