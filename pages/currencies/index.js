import Head from "next/head";
const Layout = require("../../components/Layout/Layout").default;
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
const title = 'Tools';
const heading = 'Tools Dashborad';
const text = 'Welcome to Currencies';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <h1>{ heading }</h1>
        <p>{ text }</p>
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);