export default{
    convertURLImage: (imageURL: string | null) : string =>{
        if (imageURL != null) {
            const convertedURL = imageURL.replace(/\\/g, '/');
            return convertedURL;
        }
        return '';
    }
}