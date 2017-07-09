import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const contentMargin = 20

export default class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <script src='https://use.fontawesome.com/62d036d8b5.js' />
          <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
          <style>{`
            @import url(https://fonts.googleapis.com/css?family=Lora:400);
            body {
              margin: 0;
              font-size: 22px;
              font-family: Lora, serif;
              background: #fafafa;
            }
            * {
              box-sizing: border-box;
            }
            figure {
              margin: 0 !important;
              padding-top: 56.25% !important;
              background-size: cover !important;
              background-position: center top !important;
              background-repeat: no-repeat !important;
            }
            img {
              border: 0;
              height: auto;
              max-width: 100vw;
              vertical-align: middle;
            }
            /*
            a {
              text-decoration: none;
              cursor: pointer;
              color: inherit;
            }
            */
            p {
              margin: 10px 0 0 0;
              padding: 20px 0 0 0;
            }
          `}</style>
          {styleTags}
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    )
  }
}
