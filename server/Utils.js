module.exports = {
    convertUrl: (url) =>{
        if (url != null) {
            const convertedURL = url.replace(/\\/g, '/');
            return convertedURL;
          }
          return '';
    }
}