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
  <p>
    Retrieve the URL of a file and download it in the server.
  </p>
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /take-audio (HTTP POST)
  Retrieve the URL of a file, download
  it in the server and convert it into "mp3" format.
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /file-information (HTTP POST)
  Retrieve all the information from a file by url.
  ***
    // body-xample
    {
      url: {{youtube-url}}
    }
  ***
- /download (HTTP GET)
  Retrieve a file's options passed in req.headers
  and returns the file to download.
  # Important:
  /take-audio and /take-file prepare the files to be downloaded
  and this method allows them to be downloaded.
  ***
  // Headers options
  {
    headers: {
      file_opts: {
        fileName: string, // file name
        fileExt: string // file extension
      }
    }
  }
  ***
