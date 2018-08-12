import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import Setting from '../../containers/page/settings/Setting';
const title = 'Soya - Settings';
const heading = 'Settings';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <h1>{ heading }</h1>
        <Setting />
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);