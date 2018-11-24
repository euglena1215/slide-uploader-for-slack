# Slide Uploader For Slack

## About

Slack の特定のチャンネルへ post されたスライド(pdf)を取得し、Google Drive へ保存しスプレッドシートへ書き込む Bot です。

また、スプレッドシートに保存した内容を全件取得するエンドポイントが存在するため他サービスと連携可能です。

## Requirements

- Node.js v8 or more
- [clasp](https://github.com/google/clasp)

## Install

### Install this project

```
$ git clone https://github.com/euglena1215/slide-uploader-for-slack.git
$ cd slide-uploader-for-slack
$ yarn intall
```

### Install and setup the clasp

1. Install the [clasp](https://github.com/google/clasp).

```
$ yarn global add @google/clasp
```

2. Login with your google account.

```
$ clasp login
```

3. Create new Google Apps Script.

```
$ clasp create slide-uploader-for-slack --rootDir ./dist
```

### Setup Property

1. Create SpreadSheet

Create new sheet and Rename [Sheet1] -> [pdfFiles].
And Fill [fileId, pdfUrl, imgUrl, uploadUser, timestamp] to A1:E1 cells.

2. Open script file from browser.

```
$ clasp open
```

3. Select [File] -> [Script Property], and Add the following property.

| SLACK_API_TOKEN                                                     | SPREADSHEET_URL                   | DRIVE_FOLDER_ID                                                                         | SLACK_TARGET_CHANNEL                                                                                                                |
| ------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Getting [here](https://api.slack.com/methods/channels.history/test) | Copy URL of 1. Create SpreadSheet | Create new Folder and Copy `https://drive.google.com/drive/u/0/folders/DRIVE_FOLDER_ID` | Open target channel and Copy Link anything post like `https://hoge-team.slack.com/archives/SLACK_TARGET_CHANNEL/p1543071858000200`. |

## Usage

```
$ yarn build
$ yarn push
```

## Development

If you want to use watch mode, run the next command.

```
$ yarn watch
```

In this watch mode, the build file is automatically pushed when chaging the contents in the `src` folder.

## License

[MIT](LICENSE)
