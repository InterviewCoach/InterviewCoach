'use strict';
const Hapi = require('@hapi/hapi');
const fs = require('fs')
const axios = require('axios')
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');

const client = new speech.SpeechClient();

const init = async () => {
    const server = Hapi.server({
        port: 3005,
        host: 'localhost'
    });
    server.route({
        method: 'POST',
        path: '/speech',
        config: {
            handler: async (request, h) => {
                // get the payload
                const data = request.payload;
                // check if file exists
                if (data.file) {
                    const name = data.file.hapi.filename;
                    const path = __dirname + "/uploads/" + name;
                    // we will require this encodedPath later
                    const encodedPath = __dirname + "/uploads/encoded_" + name;
                    const file = fs.createWriteStream(path);
                    file.on('error', (err) => console.error(err));
                    data.file.pipe(file);
                    return new Promise((resolve, reject) => {
                      // when the file is saved on the serever we start to convert it
                      data.file.on('end', async (err) => { 
                          // this params you probably would like to return to your app
                          const ret = {
                              filename: data.name,
                              headers: data.file.hapi.headers
                          }
                          // ffmpeg comes into action
                          // for detailed info on available options refer to ffmpeg documentation
                          ffmpeg()
                              .input(path)
                              .outputOptions([
                                  '-f s16le',
                                  '-acodec pcm_s16le',
                                  '-vn',
                                  '-ac 1',
                                  '-ar 41k',
                                  '-map_metadata -1'
                              ])
                              // here we save our result to the encodedPath we declared above
                              .save(encodedPath)
                              .on('end', async () => {
                                  // after the file is saved we read it
                                  const savedFile = await fs.readFile(encodedPath)
                                  if (!savedFile) {
                                    reject('file can not be read')
                                  }
                                  // we have to convert it to base64 in order to send to Google
                                  const audioBytes = savedFile.toString('base64');
                                  // this is also a requirement from google
                                  const audio = {
                                      content: audioBytes,
                                  }
                                  const sttConfig = {
                                      // if you need punctuation set to true
                                      enableAutomaticPunctuation: false,
                                      encoding: "LINEAR16",
                                      // same rate as we use in our ffmpeg options
                                      sampleRateHertz: 41000,
                                      languageCode: "en-US",
                                      model: "default"
                                  }
                                  // building up the request object
                                  const request = {
                                      audio: audio,
                                      config: sttConfig,
                                  }
              
                                  // now we finally pass it to the Google API and wait for the response
                                  const [response] = await client.recognize(request);
                                  if (!response) {
                                    reject('no response')
                                  }
                                  // iterate through the words and join them to get a string
                                  const transcript = response.results
                                      .map(result => result.alternatives[0].transcript)
                                      .join('\\n');
                                  // removing audio files as we don't need them any more
                                  fs.unlinkSync(path)
                                  fs.unlinkSync(encodedPath)
              
                                  // sending the response to our React Native application
                                  resolve(JSON.stringify({...ret, transcript}))
                              })
                            })
                        })
                    }
                },
            payload: {
                output: 'stream',
                parse: true,
            }
        }
    })
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
});
init();