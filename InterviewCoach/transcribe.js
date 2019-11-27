// const fs = require('fs')
// import * as RNFS from 'react-native-fs';
// import Ffmpeg from 'fluent-ffmpeg'

const transcribe = async (data) => {
    const ret = {
        filename: data.name,
        headers: data.headers
    }


    // const name = form.name
    // const path = __dirname + "/uploads/" + name
    // const encodedPath = __dirname + "/uploads/encoded_" + name;
    // const file = fs.createWriteStream(path);

    console.log('file in transcribe', data)
    return data
}

export default transcribe