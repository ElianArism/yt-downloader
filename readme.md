### YT Downloader Api :rocket:

Download any YouTube video in .mp3 or .mp4 format!

## Dependencies (to run this project locally) :computer:

- npm i
- Install ffmpeg
- Install nodemon globally (optional)
- modify FFMPEG var in .env with your ffmpeg.exe path
- if you have nodemon installed run this command: npm run start-dev
- else run: npm run start

## Endpoints :eight_pointed_black_star:

- /server (HTTP HEAD)
  Get server status.
- /take-video (HTTP POST) 
  <br>
  Retrieve the URL of a file and download it in the server.
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /take-audio (HTTP POST)
  <br/>
  Retrieve the URL of a file, download
  <br/>
  it in the server and convert it into "mp3" format.
  
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /file-information (HTTP POST)
  <br/>
  Retrieve all the information from a file by url.
  
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /download (HTTP GET)
  <br>
  Retrieve a file's options passed in req.headers
  and returns the file to download.
  ### Important:
  <br/>
  /take-audio and /take-file prepare the files to be downloaded
  <br/>and this method allows them to be downloaded.
  
  ***
  // Headers options
  { <br/>
    headers: {<br/>
      file_opts: {<br/>
        fileName: string, // file name <br/>
        fileExt: string // file extension <br/>
      } <br/>
    } <br/>
  } <br/>
  ***
