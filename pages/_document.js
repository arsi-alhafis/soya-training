import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import "@traveloka/soya-components/styles";

const __NEXT_CONFIG__ = { ...require("config") };
// exclude legacy and server config
delete __NEXT_CONFIG__.legacy;
delete __NEXT_CONFIG__.server;

export default class extends Document {
  static displayName = "SoyaDocument";

  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return {
      ...page,
      ...styles
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                __NEXT_CONFIG__ = ${JSON.stringify(__NEXT_CONFIG__)}
              `
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}